import type { RoleMenu } from '$lib/api-types';
import { db } from '$lib/db';
import { discordRest } from '$lib/discord';
import type { RequestHandler } from '@sveltejs/kit';
import { PermissionFlagsBits, Routes, type APIGuild } from 'discord-api-types/v10';

export const get: RequestHandler = async ({
	params: { guild: guildId },
	locals: { userDiscordRest }
}) => {
	if (!userDiscordRest) {
		return {
			status: 401,
			body: { error: 'Requires authorization cookies' }
		};
	}

	const guilds = (await userDiscordRest.get(Routes.userGuilds(), {
		authPrefix: 'Bearer'
	})) as APIGuild[];

	if (
		!guilds.some(
			(x) => x.id === guildId && (BigInt(x.permissions) & PermissionFlagsBits.ManageRoles) !== 0n
		)
	) {
		return {
			status: 401,
			body: { error: 'User is not a member of the guild' }
		};
	}

	const [guild, roleMenus] = await Promise.all([
		discordRest.get(`/guilds/${guildId}`) as Promise<APIGuild>,
		db.roleMenu.findMany({
			where: {
				guild: guildId
			}
		}) as Promise<unknown[]> as Promise<RoleMenu[]>
	]);

	return {
		status: 200,
		body: {
			data: {
				guild,
				roleMenus: roleMenus.map((menu) => ({
					...menu,
					roles: menu.roles ?? []
				}))
			}
		}
	};
};

export interface GetGuildInfo {
	data: GuildInfo;
}

export interface GuildInfo {
	guild: APIGuild;
	roleMenus: RoleMenu[];
}
