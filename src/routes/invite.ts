import { DISCORD_API_URL, DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI, SCOPES } from '$lib/env';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async function ({ url }) {
	const query = new URLSearchParams();

	query.set('client_id', DISCORD_CLIENT_ID);
	query.set('redirect_uri', DISCORD_REDIRECT_URI);
	query.set('response_type', 'code');
	query.set('scope', SCOPES.join(' '));

	const desiredGuild = url.searchParams.get('guild') ?? '';
	if (desiredGuild) {
		query.set('guild_id', desiredGuild);
		query.set('disable_guild_select', 'true');
	}

	const endpoint = `${DISCORD_API_URL}/oauth2/authorize?${query}`;

	return {
		headers: { Location: endpoint },
		status: 302
	};
};
