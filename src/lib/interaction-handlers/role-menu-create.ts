import type { RoleMenuMessageDef } from '$lib/api-types';
import { db } from '$lib/db';
import { discordRest } from '$lib/discord';
import { HOST } from '$lib/env';
import { hasPermission } from '$lib/permission';
import { renderRoleMenuMessage } from '$lib/render-message';
import type { RoleMenuMessage } from '@prisma/client';
import {
	ApplicationCommandType,
	ButtonStyle,
	ComponentType,
	InteractionResponseType,
	InteractionType,
	MessageFlags,
	PermissionFlagsBits,
	Routes,
	type APIInteraction,
	type APIMessage,
	type RESTPostAPIChannelMessageJSONBody
} from 'discord-api-types/v10';
import { getCommandSubcommand, interactionResponse, noPermissionMessage } from './util';

export async function handleRoleMenuCreate(i: APIInteraction) {
	// Filtering interaction
	if (i.type !== InteractionType.ApplicationCommand) return;
	if (i.data.type !== ApplicationCommandType.ChatInput) return;

	const commandName = i.data.name;
	if (commandName !== 'role-menu' && commandName !== 'rolemenu') return;

	const verb = getCommandSubcommand(i);
	if (verb !== 'create') return;

	// Permission checks
	if (i.member && !hasPermission(i.member, PermissionFlagsBits.ManageRoles)) {
		return interactionResponse(
			InteractionResponseType.ChannelMessageWithSource,
			noPermissionMessage
		);
	}

	// Actual command action
	const message = (await discordRest.post(Routes.channelMessages(i.channel_id), {
		body: {
			content: '[setting up new role menu]'
		} as RESTPostAPIChannelMessageJSONBody
	})) as APIMessage;

	const data: Omit<RoleMenuMessageDef, 'createdAt' | 'updatedAt'> = {
		id: message.id,
		channel: i.channel_id,
		guild: i.guild_id,
		message: {
			embeds: [
				{
					title: 'New Role Menu',
					description: 'Select roles below you would like to assign to yourself.'
				}
			]
		},
		components: [
			[
				{
					type: 'role-menu',
					multi: true,
					roles: []
				}
			]
		]
	};

	const menu = await db.roleMenuMessage.create({ data: data as unknown as RoleMenuMessage });

	await discordRest.patch(Routes.channelMessage(i.channel_id, message.id), {
		body: renderRoleMenuMessage(data)
	});

	return interactionResponse(InteractionResponseType.ChannelMessageWithSource, {
		embeds: [
			{
				color: 0x58f287,
				title: `Your new Role Menu is ready to be configured`
			}
		],
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						style: ButtonStyle.Link,
						url: `${HOST}/edit/${menu.guild}/${menu.id}`,
						label: 'Configure'
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
