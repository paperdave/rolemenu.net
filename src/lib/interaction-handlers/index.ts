import type { APIInteraction } from 'discord-api-types/v10';
import { handleRoleMenuCreate } from './role-menu-create';
import { handleRoleMenuEdit } from './role-menu-edit';

export const interactionHandlers = [handleRoleMenuCreate, handleRoleMenuEdit];

export async function handleInteraction(i: APIInteraction) {
	for (const handler of interactionHandlers) {
		const result = await handler(i);
		if (result) return result;
	}
	return null;
}
