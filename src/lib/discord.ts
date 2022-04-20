import { REST } from '@discordjs/rest';
import { DISCORD_BOT_TOKEN } from './env';

export const discordRest = new REST({ version: '9' }).setToken(DISCORD_BOT_TOKEN);
