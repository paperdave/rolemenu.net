import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import { renderRoleMenuMessage } from '$lib/render-message';
import { discordRest } from '$lib/discord';
import {
	PermissionFlagsBits,
	Routes,
	type APIGuild,
	type APIUser,
	type RESTGetAPIGuildMemberResult
} from 'discord-api-types/v10';
import type { RoleMenuMessageDef } from '$lib/api-types';
import { hasPermission } from '$lib/permission';

function validateRoleMenu(newMenu: any, against: RoleMenuMessageDef) {
	return true;
}

export const patch: RequestHandler = async ({
	request,
	params: { guild: guildId, menu: menuId },
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
			status: 403,
			body: { error: 'User is not a member of the guild' }
		};
	}

	const data = await request.json();
	data.updatedAt = new Date(data.updatedAt);
	data.createdAt = new Date(data.createdAt);

	const existing = (await db.roleMenuMessage.findFirst({
		where: {
			id: menuId,
			guild: guildId
		}
	})) as unknown as RoleMenuMessageDef;

	if (!existing) {
		return {
			status: 404,
			body: {
				error: 'Menu not found'
			}
		};
	}

	// TODO: Validate data
	const validation = validateRoleMenu(data, existing);
	if (typeof validation === 'string') {
		return {
			status: 400,
			body: {
				error: 'Invalid data: ' + validation
			}
		};
	}

	// compare updatedAt
	if (existing.updatedAt.getTime() !== data.updatedAt.getTime()) {
		return {
			status: 409,
			body: {
				error: 'Menu has been updated since you last fetched it',
				data: existing
			}
		};
	}

	const rendered = renderRoleMenuMessage(data);
	await discordRest.patch(Routes.channelMessage(data.channel, data.id), {
		body: rendered
	});

	await db.roleMenuMessage.update({
		where: {
			id: menuId
		},
		data: {
			...data,
			updatedAt: undefined,
			createdAt: undefined
		}
	});

	return {
		status: 200,
		body: {
			data
		}
	};
};
