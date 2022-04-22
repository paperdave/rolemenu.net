import type { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';

export interface RoleMenu {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	channel: string;
	guild: string;
	placeholder?: string;
	multi: boolean;
	message: string;
	style: 'default';
	roles: RoleMenuOption[];
}

export interface RoleMenuOption {
	role: string;
	label: string;
	description: string;
	emoji?: RoleMenuEmoji;
}

export interface RoleMenuEmoji {
	id: string;
	name: string;
}

export type GuildPreview = RESTAPIPartialCurrentUserGuild & {
	hasBot: boolean;
	hasManageServer: boolean;
};
