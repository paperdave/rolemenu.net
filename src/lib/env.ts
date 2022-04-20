import 'dotenv/config';

function envNonEmptyString(name: string) {
	const value = process.env[name];
	if (!value) {
		throw new Error(`${name} environment variable is required`);
	}
	return value;
}

export const REALM_APPID = envNonEmptyString('REALM_APPID');
export const REALM_TOKEN = envNonEmptyString('REALM_TOKEN');
export const MONGO_DB = envNonEmptyString('MONGO_DB');

export const HOST = envNonEmptyString('HOST');
export const DISCORD_API_URL = envNonEmptyString('DISCORD_API_URL');
export const DISCORD_CLIENT_ID = envNonEmptyString('DISCORD_CLIENT_ID');
export const DISCORD_CLIENT_SECRET = envNonEmptyString('DISCORD_CLIENT_SECRET');
export const DISCORD_BOT_TOKEN = envNonEmptyString('DISCORD_BOT_TOKEN');
export const DISCORD_REDIRECT_URI = `${HOST}/api/callback`;

export const SCOPES = ['identify', 'bot', 'applications.commands'];
export const PERMISSIONS = 268437504; // manage roles + send messages
