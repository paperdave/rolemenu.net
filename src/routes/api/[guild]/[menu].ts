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
	if (typeof newMenu !== 'object') return 'Not an object';
	if (newMenu === null) return 'Not an object';

	if (!(newMenu.updatedAt instanceof Date)) return 'updatedAt must be a Date';
	if (!(newMenu.createdAt instanceof Date)) return 'createdAt must be a Date';
	if (newMenu.createdAt.getTime() !== against.createdAt.getTime())
		return 'createdAt cannot be changed';
	if (newMenu.id !== against.id) return 'id cannot be changed';
	if (newMenu.channel !== against.channel) return 'channel cannot be changed';
	if (newMenu.guild !== against.guild) return 'guild cannot be changed';
	if (typeof newMenu.multi !== 'boolean') return 'multi must be a boolean';
	if (typeof newMenu.message !== 'string') return 'message must be a string';
	if (newMenu.message.length === 0 || newMenu.message.length > 2000)
		return 'message must be between 1 and 2000 characters';

	if (
		newMenu.placeholder &&
		(typeof newMenu.placeholder !== 'string' || newMenu.placeholder.length > 100)
	)
		return 'placeholder must be between 1 and 100 characters';

	if (newMenu.style !== 'default') return 'style must be "default"';

	if (!Array.isArray(newMenu.roles)) return 'roles must be an array';
	let i = 0;
	for (const role of newMenu.roles) {
		if (typeof role !== 'object') return `roles[${i}] must be an object`;
		if (typeof role === null) return `roles[${i}] must be an object`;
		if (typeof role.role !== 'string') return `roles[${i}].role must be a string`;
		if (typeof role.label !== 'string') return `roles[${i}].label must be a string`;
		if (role.label.length > 100) return `roles[${i}].label must be 100 characters or less`;
		if (role.description && role.description.length > 100)
			return `roles[${i}].description must be 100 characters or less`;
		if (role.emoji) {
			if (typeof role.emoji !== 'object') return `roles[${i}].emoji must be an object`;
			if (typeof role.emoji === null) return `roles[${i}].emoji must be an object`;
		}

		i++;
	}

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
