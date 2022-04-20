import { MessageActionRow, MessageSelectMenu, type MessageEditOptions } from 'discord.js';
import type { RoleMenu } from './structures/RoleMenu';

export function renderRoleMenuMessage(menu: RoleMenu): MessageEditOptions {
	return {
		content: `${menu.message}`,
		components: [
			new MessageActionRow().addComponents(
				new MessageSelectMenu({
					customId: 'role-menu',
					placeholder: 'Select a role',
					minValues: 0,
					maxValues: menu.multi ? menu.roles.length : 1,
					options: menu.roles
				})
			)
		]
	};
}
