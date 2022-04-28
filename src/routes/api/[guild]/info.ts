import type { RoleMenuMessageDef } from '$lib/api-types';
import { db } from '$lib/db';
import { discordRest } from '$lib/discord';
import { hasPermission } from '$lib/permission';
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
			(x) => x.id === guildId && hasPermission(x.permissions, PermissionFlagsBits.ManageRoles)
		)
	) {
		return {
			status: 401,
			body: { error: 'User is not a member of the guild' }
		};
	}

	const [guild, roleMenus] = await Promise.all([
		discordRest.get(`/guilds/${guildId}`) as Promise<APIGuild>,
		(
			db.roleMenuMessage.findMany({
				where: {
					guild: guildId
				}
			}) as Promise<unknown[]> as Promise<RoleMenuMessageDef[]>
		).then((menus) =>
			Promise.all(
				menus.map(async (menu) => {
					const message = await discordRest
						.get(Routes.channelMessage(menu.channel, menu.id))
						.catch(() => null);

					if (message) {
						return menu;
					}

					db.roleMenuMessage
						.delete({
							where: {
								id: menu.id
							}
						})
						.then(() => {
							//
						});

					return null;
				})
			).then((menus) => menus.filter((x) => x !== null))
		)
	]);

	return {
		status: 200,
		body: {
			data: {
				guild,
				roleMenus
			}
		}
	};
};

export interface GetGuildInfo {
	data: GuildInfo;
}

export interface GuildInfo {
	guild: APIGuild;
	roleMenus: RoleMenuMessageDef[];
}
