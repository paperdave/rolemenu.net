import { discordCommands } from '$lib/bot/commands';
import { discordRest } from '$lib/discord';
import { DISCORD_CLIENT_ID } from '$lib/env';
import { Routes } from 'discord-api-types/v10';

export const get = async (ctx) => {
	await discordRest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, '949329353047687189'), {
		body: []
	});

	return {
		body: 'ok'
	};
};
