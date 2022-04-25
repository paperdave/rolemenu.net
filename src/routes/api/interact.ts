import { DISCORD_PUBLIC_KEY } from '$lib/env';
import { handleInteraction } from '$lib/interaction-handlers';
import type { RequestHandler } from '@sveltejs/kit';
import {
	InteractionResponseType,
	InteractionType,
	type APIInteraction,
	type APIInteractionResponse
} from 'discord-api-types/v10';
import nacl from 'tweetnacl';
import { Buffer } from 'buffer';

type PropOrNever<O, K extends PropertyKey> = O extends Record<K, infer V> ? V : undefined;

function success<X extends InteractionResponseType>(
	type: X,
	data: PropOrNever<Extract<APIInteractionResponse, { type: X }>, 'data'>
) {
	return {
		status: 200,
		body: {
			type,
			data
		}
	};
}

export const post: RequestHandler = async ({ request }) => {
	const signature = request.headers.get('X-Signature-Ed25519');
	const timestamp = request.headers.get('X-Signature-Timestamp');
	const body = await request.text();

	const isVerified = nacl.sign.detached.verify(
		Buffer.from(timestamp + body),
		Buffer.from(signature, 'hex'),
		Buffer.from(DISCORD_PUBLIC_KEY, 'hex')
	);

	if (!isVerified) {
		return {
			status: 401,
			body: 'Invalid signature',
			headers: {
				'Cache-Control': 'no-cache'
			}
		};
	}

	const i = JSON.parse(body) as APIInteraction;

	if (i.type === InteractionType.Ping) {
		return success(InteractionResponseType.Pong, undefined);
	}

	const response = await handleInteraction(i);

	if (response) {
		return response;
	}

	return {
		status: 404,
		body: 'error',
		headers: {
			'Cache-Control': 'no-cache'
		}
	};
};
