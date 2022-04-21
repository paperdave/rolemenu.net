import type { MessageEditOptions } from 'discord.js';
import type { RoleMenuFullData } from 'src/routes/api/[guild]/info';

export function renderRoleMenuMessage(menu: RoleMenuFullData): MessageEditOptions {
	return {
		content: `${menu.message}`,
		components: [
			{
				type: 1,
				components: [
					{
						type: 3,
						custom_id: 'role-menu',
						placeholder: 'Select a role',
						min_values: 0,
						max_values: menu.multi ? menu.roles.length : 1,
						options: menu.roles.map((role) => ({
							label: role.label,
							value: role.role,
							description: role.description
						}))
					}
				]
			}
		]
	};
}
