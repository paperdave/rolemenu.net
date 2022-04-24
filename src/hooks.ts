import {
	DISCORD_API_URL,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_REDIRECT_URI,
	SCOPES
} from '$lib/env';
import { REST } from '@discordjs/rest';
import type { GetSession, Handle } from '@sveltejs/kit';
import { parse as parseCookie } from 'cookie';
import NodeCache from 'node-cache';

interface CachedTokenRefresh {
	access: string;
	refresh: string;
}

const tokenCache = new NodeCache({
	stdTTL: 20
});

export const handle: Handle = async ({ event, resolve }) => {
	let { access, refresh } = parseCookie(event.request.headers.get('cookie') || '');
	const setCookie: string[] = [];

	if (refresh && !access) {
		if (tokenCache.has(refresh)) {
			const data = tokenCache.get<CachedTokenRefresh>(refresh);
			access = data.access;
			refresh = data.refresh;
		} else {
			const auth = await fetch(`${DISCORD_API_URL}/oauth2/token`, {
				method: 'POST',
				body: new URLSearchParams({
					client_id: DISCORD_CLIENT_ID,
					client_secret: DISCORD_CLIENT_SECRET,
					grant_type: 'refresh_token',
					redirect_uri: DISCORD_REDIRECT_URI,
					refresh_token: refresh,
					scope: SCOPES.join(' ')
				}),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then((r) => r.json());

			if (auth.error) {
				access = null;
				refresh = null;
			} else {
				const oldRefresh = refresh;

				access = auth.access_token;
				refresh = auth.refresh_token;

				tokenCache.set(oldRefresh, { access, refresh });

				const accessExpires = new Date(Date.now() + auth.expires_in); // 10 minutes
				const refreshExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

				setCookie.push(
					`access=${access}; Path=/; HttpOnly; Expires=${accessExpires}`,
					`refresh=${refresh}; Path=/; HttpOnly; Expires=${refreshExpires}`
				);
			}
		}
	}

	if (event.request.headers.get('authorization')) {
		access = event.request.headers.get('authorization').split(' ')[1];
	}

	if (access) {
		event.locals.session = {
			access,
			refresh
		};
		event.locals.userDiscordRest = new REST({ version: '10' }).setToken(access);
	}

	const response = await resolve(event);

	if (setCookie.length) {
		response.headers.set('Set-Cookie', setCookie.join('; '));
	}

	return response;
};

export const getSession: GetSession = async ({ locals }) => {
	if (locals.userDiscordRest) {
		return { authorized: true };
	}
	return undefined;
};
