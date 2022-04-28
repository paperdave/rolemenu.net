import type { RMRoleButton, RoleMenuMessageDef } from '$lib/api-types';
import { discordRest } from '$lib/discord';
import {
	InteractionResponseType,
	MessageFlags,
	Routes,
	type APIMessageComponentButtonInteraction
} from 'discord-api-types/v10';
import { interactionResponse } from '../util';

export async function handleRoleButtonAct(
	i: APIMessageComponentButtonInteraction,
	message: RoleMenuMessageDef,
	component: RMRoleButton
) {
	if (i.member.roles.includes(component.role)) {
		await discordRest.put(Routes.guildMemberRole(i.guild_id, i.user.id, component.role));

		// Delete Role
		return interactionResponse(InteractionResponseType.ChannelMessageWithSource, {
			embeds: [
				{
					color: 0x58f287,
					title: `Roles Updated!`,
					description: `You no longer have <@&${component.role}> role.`
				}
			],
			flags: MessageFlags.Ephemeral
		});
	} else {
		await discordRest.delete(Routes.guildMemberRole(i.guild_id, i.user.id, component.role));

		// Add Role
		return interactionResponse(InteractionResponseType.ChannelMessageWithSource, {
			embeds: [
				{
					color: 0x58f287,
					title: `Roles Updated!`,
					description: `You now have the <@&${component.role}> role.`
				}
			],
			flags: MessageFlags.Ephemeral
		});
	}
}
