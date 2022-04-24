import { HOST } from '$lib/env';
import { hasPermission } from '$lib/permission';
import {
	ApplicationCommandType,
	ButtonStyle,
	ComponentType,
	InteractionResponseType,
	InteractionType,
	MessageFlags,
	PermissionFlagsBits,
	type APIInteraction
} from 'discord-api-types/v10';
import { getCommandSubcommand, interactionResponse, noPermissionMessage } from './util';

export async function handleRoleMenuEdit(i: APIInteraction) {
	// Filtering interaction
	if (i.type !== InteractionType.ApplicationCommand) return;
	if (i.data.type !== ApplicationCommandType.ChatInput) return;

	const commandName = i.data.name;
	if (commandName !== 'role-menu' && commandName !== 'rolemenu') return;

	const verb = getCommandSubcommand(i);
	if (verb !== 'edit') return;

	// Permission checks
	if (i.member && !hasPermission(i.member, PermissionFlagsBits.ManageRoles)) {
		return interactionResponse(
			InteractionResponseType.ChannelMessageWithSource,
			noPermissionMessage
		);
	}

	// Actual command action
	return interactionResponse(InteractionResponseType.ChannelMessageWithSource, {
		embeds: [
			{
				title: `Role Menu editing is done through our web interface.`
			}
		],
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						style: ButtonStyle.Link,
						url: `${HOST}/edit/${i.guild_id}`,
						label: 'Configure Role Menus'
					},
					{
						type: ComponentType.Button,
						style: ButtonStyle.Link,
						url: `${HOST}/docs`,
						label: 'Learn More'
					}
				]
			}
		],
		flags: MessageFlags.Ephemeral
	});
}
