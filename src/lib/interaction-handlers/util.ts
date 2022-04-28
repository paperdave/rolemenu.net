import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	InteractionResponseType,
	MessageFlags,
	type APIApplicationCommandInteraction,
	type APIInteractionResponse,
	type APIInteractionResponseCallbackData
} from 'discord-api-types/v10';

export function getCommandSubcommand(i: APIApplicationCommandInteraction) {
	if (i.data.type === ApplicationCommandType.ChatInput) {
		return i.data.options.find((x) => x.type === ApplicationCommandOptionType.Subcommand)?.name;
	}
}

type PropOrNever<O, K extends PropertyKey> = O extends Record<K, infer V> ? V : undefined;

export function interactionResponse<
	X extends InteractionResponseType,
	Y = PropOrNever<Extract<APIInteractionResponse, { type: X }>, 'data'>
>(type: X, data: Y) {
	return {
		status: 200,
		body: {
			type,
			data
		},
		headers: {
			'Cache-Control': 'no-cache'
		}
	};
}

export const noPermissionMessage: APIInteractionResponseCallbackData = {
	embeds: [
		{
			title: 'You must have the "Manage Roles" permission to manage Role Menus.',
			color: 0xff3333
		}
	],
	flags: MessageFlags.Ephemeral
};
