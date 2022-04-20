import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI, SCOPES } from '$lib/env';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	const disco_refresh_token = url.searchParams.get('code');
	if (!disco_refresh_token) {
		return {
			body: JSON.stringify({ error: 'No refresh token found' }),
			status: 500
		};
	}

	// initializing data object to be pushed to Discord's token endpoint.
	// quite similar to what we set up in callback.js, expect with different grant_type.
	const dataObject = new URLSearchParams({
		client_id: DISCORD_CLIENT_ID,
		client_secret: DISCORD_CLIENT_SECRET,
		grant_type: 'refresh_token',
		redirect_uri: DISCORD_REDIRECT_URI,
		refresh_token: disco_refresh_token,
		scope: SCOPES.join(' ')
	});

	// performing a Fetch request to Discord's token endpoint
	const request = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		body: dataObject,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});

	const response = await request.json();

	if (response.error) {
		return {
			status: 500,
			body: JSON.stringify({ error: response.error })
		};
	}

	const accessExpires = new Date(Date.now() + response.expires_in); // 10 minutes
	const refreshExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

	return {
		status: 200,
		body: JSON.stringify({
			access: response.access_token,
			refresh: response.refresh_token,
			accessExpires: accessExpires.getTime(),
			refreshExpires: refreshExpires.getTime()
		})
	};
};
