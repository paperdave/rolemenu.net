import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	PermissionFlagsBits,
	type RESTPostAPIApplicationCommandsJSONBody
} from 'discord-api-types/v10';

export const discordCommands: RESTPostAPIApplicationCommandsJSONBody[] = [
	{
		name: 'rolemenu',
		description: "Manage your server's Role Menus",
		type: ApplicationCommandType.ChatInput,
		// @ts-ignore `default_member_permissions` isn't on discord-api-types yet
		default_member_permissions: String(PermissionFlagsBits.ManageRoles),
		dm_permission: false,
		options: [
			{
				name: 'create',
				description: 'Create a new Role Menu',
				type: ApplicationCommandOptionType.Subcommand
			},
			{
				name: 'edit',
				description: 'Get a link to the Role Menu editor',
				type: ApplicationCommandOptionType.Subcommand
			}
		]
	}
];
