import {
	DISCORD_API_URL,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_REDIRECT_URI
} from '$lib/env';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
	// fetch returnCode set in the URL parameters.
	const { code } = await request.json();

	// initializing data object to be pushed to Discord's token endpoint.
	// the endpoint returns access & refresh tokens for the user.
	const dataObject = new URLSearchParams({
		client_id: DISCORD_CLIENT_ID,
		client_secret: DISCORD_CLIENT_SECRET,
		grant_type: 'authorization_code',
		redirect_uri: DISCORD_REDIRECT_URI,
		code: code,
		scope: 'identify email guilds'
	});

	// performing a Fetch request to Discord's token endpoint
	const request2 = await fetch(`${DISCORD_API_URL}/oauth2/token`, {
		method: 'POST',
		body: dataObject,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});

	const response = await request2.json();

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
