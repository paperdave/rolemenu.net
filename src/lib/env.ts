import { PermissionFlagsBits } from 'discord-api-types/v10';
import 'dotenv/config';

function envNonEmptyString(name: string) {
	const value = process.env[name];
	if (!value) {
		throw new Error(`${name} environment variable is required`);
	}
	return value;
}

export const HOST = envNonEmptyString('HOST');
export const DISCORD_API_URL = envNonEmptyString('DISCORD_API_URL');
export const DISCORD_CLIENT_ID = envNonEmptyString('DISCORD_CLIENT_ID');
export const DISCORD_CLIENT_SECRET = envNonEmptyString('DISCORD_CLIENT_SECRET');
export const DISCORD_BOT_TOKEN = envNonEmptyString('DISCORD_BOT_TOKEN');
export const DISCORD_REDIRECT_URI = `${HOST}/api/callback`;

export const SCOPES = ['identify', 'email', 'guilds'];
export const SCOPES_BOT = [...SCOPES, 'bot', 'applications.commands'];
export const PERMISSIONS = PermissionFlagsBits.ManageRoles + PermissionFlagsBits.SendMessages;
