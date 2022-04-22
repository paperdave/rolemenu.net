import type { GuildPreview } from '$lib/api-types';
import { discordRest } from '$lib/discord';
import { pipe } from '$lib/pipe';
import type { RequestHandler } from '@sveltejs/kit';
import { PermissionFlagsBits, Routes, type APIGuild } from 'discord-api-types/v10';

export const get: RequestHandler = async ({ locals: { userDiscordRest } }) => {
	if (!userDiscordRest) {
		return {
			status: 401,
			body: { error: 'Requires authorization cookies' }
		};
	}

	const guilds = (await userDiscordRest.get(Routes.userGuilds(), {
		authPrefix: 'Bearer'
	})) as APIGuild[];

	const result = await pipe(
		guilds,
		(guilds) => guilds.filter((g) => BigInt(g.permissions) & PermissionFlagsBits.ManageRoles),
		(guilds) =>
			guilds.map(async (g) => {
				const isIn = await discordRest
					.get(Routes.guild(g.id))
					.then(() => true)
					.catch(() => false);

				return {
					id: g.id,
					name: g.name,
					icon: g.icon,
					hasBot: isIn,
					hasManageServer: (BigInt(g.permissions) & PermissionFlagsBits.ManageGuild) !== 0n
				};
			}),
		(guilds) => Promise.all(guilds),
		(guilds) =>
			guilds.then((guilds) =>
				guilds.sort((a, b) => {
					if (a.hasBot && !b.hasBot) {
						return -1;
					} else if (!a.hasBot && b.hasBot) {
						return 1;
					} else if (a.hasManageServer && !b.hasManageServer) {
						return -1;
					} else if (!a.hasManageServer && b.hasManageServer) {
						return 1;
					} else {
						return a.name.localeCompare(b.name);
					}
				})
			)
	);

	return {
		status: 200,
		body: {
			data: result
		}
	};
};

export interface GetUserGuilds {
	data: GuildPreview[];
}
