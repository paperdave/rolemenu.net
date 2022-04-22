import type { RoleMenu } from './api-types';

export function renderRoleMenuMessage(menu: RoleMenu) {
	return {
		content: `${menu.message}`,
		components: [
			{
				type: 1,
				components: [
					{
						type: 3,
						custom_id: 'role-menu',
						placeholder: menu.placeholder ?? (menu.multi ? 'Select roles' : 'Select a role'),
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
