import type { RoleMenuMessageDef } from '$lib/api-types';
import { db } from '$lib/db';
import { discordRest } from '$lib/discord';
import { hasPermission } from '$lib/permission';
import type { RequestHandler } from '@sveltejs/kit';
import {
	PermissionFlagsBits,
	Routes,
	type APIGuild,
	type APIChannel,
	type APIPartialChannel
} from 'discord-api-types/v10';

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

	const [guild, channels, roleMenus] = await Promise.all([
		discordRest.get(Routes.guild(guildId)) as Promise<APIGuild>,
		(discordRest.get(Routes.guildChannels(guildId)) as Promise<APIChannel[]>).then((channels) =>
			channels.map((channel) => {
				return {
					id: channel.id,
					name: channel.name,
					type: channel.type
				};
			})
		),
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

	let myPermissions = 0n;
	for (const role of guild.roles) {
		myPermissions |= BigInt(role.permissions);
	}

	return {
		status: 200,
		body: {
			data: {
				guild,
				roleMenus,
				channels,
				isAdmin: hasPermission(myPermissions, PermissionFlagsBits.Administrator)
			}
		}
	};
};

export interface GetGuildInfo {
	data: GuildInfo;
}

export interface GuildInfo {
	guild: APIGuild;
	channels: APIPartialChannel[];
	roleMenus: RoleMenuMessageDef[];
	isAdmin: boolean;
}
