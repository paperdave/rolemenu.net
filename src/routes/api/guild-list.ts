import { discordRest } from '$lib/discord';
import { REST } from '@discordjs/rest';
import type { RequestHandler } from '@sveltejs/kit';
import { Permissions } from 'discord.js';

interface RawGuild {
	id: string;
	name: string;
	icon: string;
	owner: boolean;
	permissions: string;
	features: string[];
}

export const get: RequestHandler = async ({ request }) => {
	const authorization = request.headers.get('Authorization');
	if (!authorization) {
		return {
			status: 401,
			body: JSON.stringify({ error: 'No authorization header found' })
		};
	}

	const bearer = authorization.match(/^Bearer (.*)$/)[1];
	const userRest = new REST().setToken(bearer);
	const guilds = (await userRest.get('/users/@me/guilds', { authPrefix: 'Bearer' })) as RawGuild[];

	const guildsWithPermission = guilds.filter((guild) => {
		return new Permissions(BigInt(guild.permissions)).has('MANAGE_ROLES');
	});

	const mappedData = await Promise.all(
		guildsWithPermission.map(async (guild) => {
			const isIn = await discordRest
				.get(`/guilds/${guild.id}`)
				.then(() => true)
				.catch(() => false);

			return {
				id: guild.id,
				name: guild.name,
				icon: guild.icon,
				hasBot: isIn,
				hasManageServer: new Permissions(BigInt(guild.permissions)).has('MANAGE_GUILD')
			};
		})
	);

	return {
		status: 200,
		body: mappedData
	};
};

export interface RMGuildPreview {
	id: string;
	name: string;
	icon: string;
	hasBot: boolean;
	hasManageServer: boolean;
}

export type RMGuildList = RMGuildPreview[];
