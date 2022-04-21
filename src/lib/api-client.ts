import { browser } from '$app/env';
import type { RMGuildList } from 'src/routes/api/user/guilds';
import type { RoleMenuFullData, RoleMenuList } from 'src/routes/api/[guild]/info';
import { get } from 'svelte/store';
import { CacheMap } from './cache-map';
import { session } from './session';

export type URLSearchParamsOptions = ConstructorParameters<typeof URLSearchParams>[0];

export const guildListCache = new CacheMap<string, RMGuildList | Promise<RMGuildList>>();
export const roleMenuListCache = new CacheMap<string, RoleMenuList | Promise<RoleMenuList>>();

export async function apiGet<R>(url: string): Promise<{ data: R }> {
	if (!browser) {
		return {};
	}
	return fetch(`/api${url}`, {
		headers: {
			Authorization: `Bearer ${get(session).token.access}`
		}
	}).then((res) => res.json());
}

export async function apiPatch<R>(url: string, data: unknown): Promise<{ data: R }> {
	if (!browser) {
		return {};
	}
	return fetch(`/api${url}`, {
		headers: {
			Authorization: `Bearer ${get(session).token.access}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
		method: 'PATCH'
	}).then((res) => res.json());
}

export async function apiFetchGuildList() {
	if (!guildListCache.has('guilds')) {
		guildListCache.set(
			'guilds',
			(async () => {
				const { data } = await apiGet<RMGuildList>('/user/guilds');
				console.log(data);
				guildListCache.set('guilds', data);
				return data;
			})()
		);
	}
	return guildListCache.get('guilds');
}

export async function apiFetchRoleMenuList(guildId: string) {
	if (!roleMenuListCache.has(guildId)) {
		roleMenuListCache.set(
			guildId,
			(async () => {
				const { data } = await apiGet<RoleMenuList>(`/${guildId}/info`, { guildId });
				roleMenuListCache.set(guildId, data);
				return data;
			})()
		);
	}
	return roleMenuListCache.get(guildId);
}

export async function apiFetchGuild(guildId: string) {
	return (await apiFetchRoleMenuList(guildId)).guild;
}

export async function apiFetchRoleMenus(guildId: string) {
	return (await apiFetchRoleMenuList(guildId)).roleMenus;
}

export async function apiPatchRoleMenu(roleMenuData: RoleMenuFullData) {
	return apiPatch<RoleMenuFullData>(`/${roleMenuData.guild}/${roleMenuData.id}`, roleMenuData);
}
