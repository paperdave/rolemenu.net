import { ComponentType, type RESTPatchAPIChannelJSONBody } from 'discord-api-types/v10';
import type { RoleMenu } from './api-types';

export function renderRoleMenuMessage(menu: RoleMenu) {
	return {
		content: `${menu.message}`,
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.SelectMenu,
						custom_id: 'role-menu',
						placeholder: menu.placeholder ?? (menu.multi ? 'Select roles' : 'Select a role'),
						min_values: 0,
						max_values: menu.multi ? menu.roles.length : 1,
						options: (menu.roles.length > 0
							? menu.roles
							: [{ label: 'No roles available', role: 'null' }]
						).map((role) => ({
							label: role.label,
							value: role.role,
							description: role.description
						}))
					}
				]
			}
		]
	} as RESTPatchAPIChannelJSONBody;
}
