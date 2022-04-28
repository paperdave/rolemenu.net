import type {
	APIButtonComponentWithCustomId,
	APIMessageComponentEmoji,
	RESTAPIPartialCurrentUserGuild,
	RESTPatchAPIChannelMessageJSONBody
} from 'discord-api-types/v10';

export interface RoleMenuMessageDef {
	id: string;
	channel: string;
	guild: string;
	createdAt: Date;
	updatedAt: Date;
	message: Omit<RESTPatchAPIChannelMessageJSONBody, 'components'>;
	components: RMComponentType[][];
}

export type RMComponentType = RMRoleMenu | RMRoleButton | RMLinkButton;

export interface RMRoleMenu {
	type: 'role-menu';
	placeholder?: string;
	multi: boolean;
	roles: RoleMenuOption[];
}

export interface RMRoleButton {
	type: 'role-button';
	role: string;
	button: Omit<APIButtonComponentWithCustomId, 'custom_id'>;
}

export interface RMLinkButton {
	type: 'link';
	label: string;
	url: string;
	emoji?: APIMessageComponentEmoji;
}

export interface RoleMenuOption {
	role: string;
	label: string;
	description?: string;
	emoji?: APIMessageComponentEmoji;
}

export type GuildPreview = RESTAPIPartialCurrentUserGuild & {
	hasBot: boolean;
	hasManageGuild: boolean;
};

export interface DisplayableRoleMenu {
	placeholder: string;
	roles: DisplayableRoleMenuOption[];
	multi?: boolean;
}

export interface DisplayableRoleMenuOption {
	label: string;
	description?: string;
	emoji?: APIMessageComponentEmoji;
}
