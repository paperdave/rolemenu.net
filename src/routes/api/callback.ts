import {
	DISCORD_API_URL,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_REDIRECT_URI,
	SCOPES
} from '$lib/env';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');
	const guildId = url.searchParams.get('guild_id');
	const error = url.searchParams.get('error');

	if (error === 'access_denied') {
		return {
			status: 302,
			headers: {
				Location: '/'
			}
		};
	}

	const auth = await fetch(`${DISCORD_API_URL}/oauth2/token`, {
		method: 'POST',
		body: new URLSearchParams({
			client_id: DISCORD_CLIENT_ID,
			client_secret: DISCORD_CLIENT_SECRET,
			grant_type: 'authorization_code',
			redirect_uri: DISCORD_REDIRECT_URI,
			code: code,
			scope: SCOPES.join(' ')
		}),
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	}).then((r) => r.json());

	if (auth.error) {
		return {
			status: 500,
			body: { error: auth.error }
		};
	}

	const accessExpires = new Date(Date.now() + auth.expires_in); // 10 minutes
	const refreshExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

	return {
		status: 302,
		headers: {
			'Set-Cookie': [
				`access=${auth.access_token}; Path=/; HttpOnly; Expires=${accessExpires}`,
				`refresh=${auth.refresh_token}; Path=/; HttpOnly; Expires=${refreshExpires}`
			],
			Location: guildId ? `/edit/${guildId}` : '/edit'
		}
	};
};
