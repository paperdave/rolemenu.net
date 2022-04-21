import { DISCORD_BOT_TOKEN, HOST } from '$lib/env';
import { Client, TextChannel } from 'discord.js';
import { discordCommands } from './commands';

const client = new Client({ intents: [] });

client.on('ready', () => {
	console.log('Bot is ready!');
	client.application.commands.set(discordCommands);
});

client.on('interactionCreate', async (i) => {
	if (i.type === 'PING') {
		return;
	}

	if (i.isApplicationCommand()) {
		if (i.commandName === 'role-menu') {
			const permissions = i.memberPermissions;
			if (!permissions.has('MANAGE_ROLES')) {
				i.reply({
					ephemeral: true,
					content: 'You must have the "Manage Roles" permission to use manage Role Menus.'
				});
				return;
			}

			const verb = i.options.data[0].name;

			if (verb === 'create') {
				const db = await getDatabase(RoleMenu);

				const guild = await i.client.guilds.fetch(i.guildId);
				const channel = (await guild.channels.fetch(i.channelId)) as TextChannel;

				const message = await channel.send(`**Role Menu**`);

				const menu = new RoleMenu({
					id: message.id,
					channel: message.channel.id,
					guild: i.guild.id
				});

				await db.insertOne(menu);

				i.reply({
					ephemeral: true,
					content: `Edit this role menu at: ${HOST}/edit/${menu.guild}/${menu.id}`
				});
			} else if (verb === 'edit') {
				i.reply({
					ephemeral: true,
					content: `You can edit your server's role menus here: ${HOST}/edit/${i.guild.id}`
				});
			}
		}
	}
});

client.login(DISCORD_BOT_TOKEN);
