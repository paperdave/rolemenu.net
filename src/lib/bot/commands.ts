import type { ApplicationCommandData } from 'discord.js';

export const discordCommands: ApplicationCommandData[] = [
	{
		name: 'role-menu',
		description: 'Manage Role Menus',
		type: 'CHAT_INPUT',
		options: [
			{
				name: 'create',
				description: 'Create a new role menu',
				type: 'SUB_COMMAND'
			},
			{
				name: 'edit',
				description: 'Get a link to the role menu editor',
				type: 'SUB_COMMAND'
			}
		]
	}
];
