import {
	ButtonStyle,
	ComponentType,
	type APIMessageActionRowComponent,
	type RESTPatchAPIChannelMessageJSONBody
} from 'discord-api-types/v10';
import type {
	RoleMenuMessageDef,
	RMComponentType,
	RMRoleMenu,
	RMRoleButton,
	RMLinkButton
} from './api-types';

export function renderRoleMenu(menu: RMRoleMenu, idSuffix: string): APIMessageActionRowComponent {
	return {
		type: ComponentType.SelectMenu,
		custom_id: 'action:role-menu,' + idSuffix,
		placeholder: menu.placeholder,
		min_values: 0,
		max_values: menu.multi ? menu.roles.length : 1,
		options: (menu.roles.length > 0
			? menu.roles
			: [{ label: 'No roles available', role: 'null' }]
		).map((role) => ({
			label: role.label,
			value: role.role,
			description: role.description
		})),
		disabled: menu.roles.length === 0
	};
}

export function renderRoleButton(
	btn: RMRoleButton,
	idSuffix: string
): APIMessageActionRowComponent {
	return {
		...btn.button,
		type: ComponentType.Button,
		custom_id: 'action:role-button,' + idSuffix
	};
}

export function renderLinkButton(btn: RMLinkButton): APIMessageActionRowComponent {
	return {
		type: ComponentType.Button,
		style: ButtonStyle.Link,
		url: btn.url,
		emoji: btn.emoji,
		label: btn.label
	};
}

export function renderComponent(
	menu: RMComponentType,
	idSuffix: string
): APIMessageActionRowComponent {
	switch (menu.type) {
		case 'role-menu':
			return renderRoleMenu(menu, idSuffix);
		case 'role-button':
			return renderRoleButton(menu, idSuffix);
		case 'link':
			return renderLinkButton(menu);
		default:
			throw new Error('Unknown component type');
	}
}

export function renderRoleMenuMessage(
	menu: Omit<RoleMenuMessageDef, 'createdAt' | 'updatedAt'>
): RESTPatchAPIChannelMessageJSONBody {
	return {
		...menu.message,
		components: menu.components.map((item, row) => ({
			type: ComponentType.ActionRow,
			components: item.map((component, col) => renderComponent(component, `${row},${col}`))
		}))
	};
}
