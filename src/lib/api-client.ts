import { browser } from '$app/env';
import type { GetUserGuilds } from 'src/routes/api/user/guilds';
import type { GetGuildInfo, GuildInfo } from 'src/routes/api/[guild]/info';
import { RESTClient } from './api-client-base';
import type { RoleMenu, GuildPreview } from './api-types';
import { CacheMap } from './cache-map';

const globalCache = new CacheMap<string, unknown>();

export class RoleMenuClient extends RESTClient {
	#cache = browser ? globalCache : new Map();

	async getUserGuilds(): Promise<GuildPreview[]> {
		if (!this.#cache.has('guilds')) {
			this.#cache.set(
				'guilds',
				this.get<GetUserGuilds>('/user/guilds').then((res) => {
					this.#cache.set('guilds', res.data);
					return res.data;
				})
			);
		}
		return this.#cache.get('guilds') as Promise<GuildPreview[]>;
	}

	async getGuildInfo(guildId: string): Promise<GuildInfo> {
		if (!this.#cache.has(guildId)) {
			this.#cache.set(
				guildId,
				this.get<GetGuildInfo>(`/${guildId}/info`).then((res) => {
					this.#cache.set(guildId, res.data);
					return res.data;
				})
			);
		}
		return this.#cache.get(guildId) as Promise<GuildInfo>;
	}

	async getGuild(guildId: string) {
		return (await this.getGuildInfo(guildId)).guild;
	}

	async getRoleMenuList(guildId: string) {
		return (await this.getGuildInfo(guildId)).roleMenus;
	}

	async getRoleMenu(guildId: string, roleId: string) {
		return (await this.getRoleMenuList(guildId)).find((roleMenu) => roleMenu.id === roleId);
	}

	getCachedGuildList() {
		return (this.#cache.get('guilds') as GuildPreview[]) ?? null;
	}

	getCachedGuildInfo(guildId: string) {
		return (this.#cache.get(guildId) as GuildInfo) ?? null;
	}

	getCachedGuild(guildId: string) {
		const guildInfo = this.getCachedGuildInfo(guildId);
		return guildInfo?.guild ?? null;
	}

	getCachedRoleMenuList(guildId: string) {
		const guildInfo = this.getCachedGuildInfo(guildId);
		return guildInfo?.roleMenus ?? null;
	}

	getCachedRoleMenu(guildId: string, roleId: string) {
		const roleMenus = this.getCachedRoleMenuList(guildId);
		return roleMenus?.find((roleMenu) => roleMenu.id === roleId) ?? null;
	}

	clearCache() {
		this.#cache.clear();
	}

	updateRoleMenu(copied: RoleMenu) {
		return this.patch<RoleMenu>(`/${copied.guild}/${copied.id}`, {
			body: copied
		});
	}
}

export const roleMenuAPI = new RoleMenuClient('/api');
