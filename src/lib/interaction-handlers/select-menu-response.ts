import type { APIInteraction } from 'discord-api-types/v10';

export function handleSelectMenu(i: APIInteraction) {
	if (
		i.type === InteractionType.MessageComponent &&
		i.data.component_type === ComponentType.SelectMenu
	) {
		const selections = i.data.values;

		return success(InteractionResponseType.ChannelMessageWithSource, {
			embeds: [
				{
					color: 0x58f287,
					title: `Pretend it worked.`,
					description: `choices: ${selections.map((x) => `<@&${x}>`).join(', ')}`
				}
			],
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							label: 'Undo',
							custom_id: 'undo'
						},
						{
							type: ComponentType.Button,
							style: ButtonStyle.Link,
							url: `${HOST}/docs`,
							label: 'Learn about Role Menus'
						}
					]
				}
			],
			flags: MessageFlags.Ephemeral
		});
	}
}
