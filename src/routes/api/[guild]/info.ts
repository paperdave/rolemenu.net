import { db } from '$lib/db';
import { discordRest } from '$lib/discord';
import type { RoleMenu, RoleMenuRole } from '@prisma/client';

export const get = async ({ url, params }) => {
	const guildId = params.guild;

	if (!guildId) {
		return {
			status: 400,
			body: { error: 'No `guildId` found' }
		};
	}

	const [guild, roleMenus] = await Promise.all([
		discordRest.get(`/guilds/${guildId}`),
		db.roleMenu.findMany({
			where: {
				guild: guildId
			}
		})
	]);

	return {
		status: 200,
		body: {
			data: {
				guild,
				roleMenus: roleMenus.map((menu) => ({
					...menu,
					roles: menu.roles ?? []
				}))
			}
		}
	};
};

export type RoleMenuFullData = RoleMenu & { roles: RoleMenuRole[] };

export interface RoleMenuList {
	guild: RoleMenuListGuild;
	roleMenus: RoleMenuFullData[];
}

export interface RoleMenuListGuild {
	id: string;
	name: string;
	icon: string;
	description: string | null;
	splash: string | null;
	discovery_splash: string | null;
	features: unknown[];
	emojis: unknown[];
	stickers: unknown[];
	banner: string | null;
	owner_id: string;
	application_id: string | null;
	region: string;
	afk_channel_id: null;
	afk_timeout: number;
	system_channel_id: string;
	widget_enabled: false;
	widget_channel_id: string | null;
	verification_level: number;
	default_message_notifications: number;
	mfa_level: number;
	explicit_content_filter: number;
	max_presences: number;
	max_members: number;
	max_video_channel_users: number;
	vanity_url_code: number;
	premium_tier: number;
	premium_subscription_count: number;
	system_channel_flags: number;
	preferred_locale: string;
	rules_channel_id: number;
	public_updates_channel_id: number;
	hub_type: number;
	premium_progress_bar_enabled: boolean;
	nsfw: boolean;
	nsfw_level: number;
	roles: RoleMenuListGuildRole[];
}

export interface RoleMenuListGuildRole {
	id: string;
	name: string;
	permissions: string;
	position: number;
	color: number;
	hoist: boolean;
	managed: boolean;
	mentionable: boolean;
	icon: unknown;
	unicode_emoji: unknown;
}
