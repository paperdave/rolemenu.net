import { db } from '$lib/db';
import { discordRest } from '$lib/discord';
import { Routes } from 'discord-api-types/v10';

export const get = async () => {
	return {
		status: 200,
		body: {
			serverCount:
				(await discordRest.get(Routes.userGuilds()).then((list: any[]) => list.length)) - 10,
			roleMenuCount: await db.roleMenuMessage.count()
		}
	};
};
