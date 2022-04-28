import type { RoleMenuMessageDef } from '$lib/api-types';
import { db } from '$lib/db';
import {
	InteractionResponseType,
	InteractionType,
	type APIInteraction,
	type APIInteractionResponseCallbackData
} from 'discord-api-types/v10';
import { handleRoleButtonAct } from './component-actions/role-button';
import { handleRoleMenuAct } from './component-actions/role-menu';
import { interactionResponse } from './util';

const handlers = {
	'role-menu': handleRoleMenuAct,
	'role-button': handleRoleButtonAct
};

export async function handleComponentAction(i: APIInteraction) {
	if (i.type !== InteractionType.MessageComponent || !i.data.custom_id.startsWith('action:'))
		return;

	const [type, rowString, colString] = i.data.custom_id.slice('action:'.length).split(',');
	const row = parseInt(rowString, 10);
	const col = parseInt(colString, 10);

	const rm = (await db.roleMenuMessage.findFirst({
		where: {
			id: i.message.id
		}
	})) as unknown as RoleMenuMessageDef;

	if (!rm) {
		return interactionResponse<
			InteractionResponseType.UpdateMessage,
			APIInteractionResponseCallbackData
		>(InteractionResponseType.UpdateMessage, {
			content: '[this role menu was deleted, somehow]'
		});
	}

	const componentDefinition = rm.components[row][col];
	if (!componentDefinition || type !== componentDefinition.type) {
		return interactionResponse(InteractionResponseType.ChannelMessageWithSource, {
			content: 'error: this role menu was out of sync. please try again.'
		});
	}

	const handler = handlers[type];
	if (!handler) {
		throw new Error('how?');
	}

	return handler(i, rm, componentDefinition);
}
