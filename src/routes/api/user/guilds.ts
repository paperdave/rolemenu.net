import type { GuildPreview } from '$lib/api-types';
import { db } from '$lib/db';
import { discordRest } from '$lib/discord';
import { hasPermission } from '$lib/permission';
import { pipe } from '$lib/pipe';
import type { RequestHandler } from '@sveltejs/kit';
import {
	PermissionFlagsBits,
	Routes,
	type APIGuild,
	type RESTGetAPIUserResult
} from 'discord-api-types/v10';

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

	const me = (await userDiscordRest.get(Routes.user(), {
		authPrefix: 'Bearer'
	})) as RESTGetAPIUserResult;

	const result = await pipe(
		guilds,
		(guilds) => guilds.filter((g) => hasPermission(g.permissions, PermissionFlagsBits.ManageRoles)),
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
					hasOwner: g.owner_id === me.id,
					hasManageGuild: hasPermission(g.permissions, PermissionFlagsBits.ManageGuild),
					roleMenus: await db.roleMenuMessage.count({ where: { guild: g.id } })
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
					} else if (a.hasManageGuild && !b.hasManageGuild) {
						return -1;
					} else if (!a.hasManageGuild && b.hasManageGuild) {
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
