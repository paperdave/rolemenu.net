import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import { renderRoleMenuMessage } from '$lib/render-message';
import { discordRest } from '$lib/discord';

export const patch: RequestHandler = async ({ request, url, params }) => {
	const guildId = params.guild;
	const menuId = params.menu;

	const data = await request.json();
	data.updatedAt = new Date(data.updatedAt);
	data.createdAt = new Date(data.createdAt);

	const existing = await db.roleMenu.findFirst({
		where: {
			id: menuId,
			guild: guildId
		}
	});

	if (!existing) {
		return {
			status: 404,
			body: {
				error: 'Menu not found'
			}
		};
	}

	// TODO: Validate data

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

	// update
	await db.roleMenu.update({
		where: {
			id: menuId
		},
		data: {
			...data,
			updatedAt: undefined,
			createdAt: undefined
		}
	});

	// render
	const rendered = renderRoleMenuMessage(data);
	discordRest.patch(`/channels/${data.channel}/messages/${data.id}`, {
		body: rendered
	});

	return {
		status: 200,
		body: {
			data
		}
	};
};
