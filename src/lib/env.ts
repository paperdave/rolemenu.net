import { PermissionFlagsBits } from 'discord-api-types/v10';

function envNonEmptyString(name: string, value: string) {
	if (!value) {
		throw new Error(`${name} environment variable is required`);
	}
	return value;
}

function envStringArray(name: string, value: string) {
	if (!value) {
		return [];
	} else {
		return value.split(',').map((s) => s.trim());
	}
}

export const HOST = envNonEmptyString('HOST', process.env.HOST);
export const DISCORD_API_URL = envNonEmptyString('DISCORD_API_URL', process.env.DISCORD_API_URL);
export const DISCORD_CLIENT_ID = envNonEmptyString(
	'DISCORD_CLIENT_ID',
	process.env.DISCORD_CLIENT_ID
);
export const DISCORD_CLIENT_SECRET = envNonEmptyString(
	'DISCORD_CLIENT_SECRET',
	process.env.DISCORD_CLIENT_SECRET
);
export const DISCORD_BOT_TOKEN = envNonEmptyString(
	'DISCORD_BOT_TOKEN',
	process.env.DISCORD_BOT_TOKEN
);
export const DISCORD_PUBLIC_KEY = envNonEmptyString(
	'DISCORD_PUBLIC_KEY',
	process.env.DISCORD_PUBLIC_KEY
);

export const DISCORD_REDIRECT_URI = `${HOST}/api/callback`;

export const SCOPES = ['identify', 'guilds'];
export const SCOPES_BOT = [...SCOPES, 'bot', 'applications.commands'];
export const PERMISSIONS =
	// PermissionFlagsBits.Administrator +
	PermissionFlagsBits.ManageRoles + PermissionFlagsBits.SendMessages;

export const SUPPORT_URL = `https://discord.gg/4AbvSXV`;
