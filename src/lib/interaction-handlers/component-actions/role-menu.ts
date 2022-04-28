import type { RMRoleMenu, RoleMenuMessageDef } from '$lib/api-types';
import { HOST } from '$lib/env';
import {
	ButtonStyle,
	ComponentType,
	InteractionResponseType,
	MessageFlags,
	type APIMessageComponentSelectMenuInteraction
} from 'discord-api-types/v10';
import { interactionResponse } from '../util';

export function handleRoleMenuAct(
	i: APIMessageComponentSelectMenuInteraction,
	message: RoleMenuMessageDef,
	component: RMRoleMenu
) {
	//
	const selections = i.data.values;
	return interactionResponse(InteractionResponseType.ChannelMessageWithSource, {
		embeds: [
			{
				color: 0x58f287,
				title: `Pretend it worked.`,
				description: `choices: ${selections.map((x) => `<@&${x}>`).join(', ')}`
			}
		],
		flags: MessageFlags.Ephemeral
	});
}
