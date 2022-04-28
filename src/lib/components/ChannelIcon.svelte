<script lang="ts">
	import { ChannelType, type APIGuild, type APIPartialChannel } from 'discord-api-types/v10';

	export let guild: Pick<APIGuild, 'rules_channel_id'>;
	export let channel: Pick<APIPartialChannel, 'id' | 'type'>;
</script>

<main>
	{#if channel.id === guild.rules_channel_id}
		[rules]
	{:else if channel.type === ChannelType.GuildText}
		[text]
	{:else if channel.type === ChannelType.GuildNews}
		[news]
	{/if}
</main>

<style lang="scss">
</style>
