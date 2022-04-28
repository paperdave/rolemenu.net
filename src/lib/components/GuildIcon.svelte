<script lang="ts">
	import type { APIGuild } from 'discord-api-types/v10';

	export let guild: Pick<APIGuild, 'id' | 'icon' | 'name'>;
</script>

<main>
	{#if guild.icon}
		<img
			src="https://cdn.discordapp.com/icons/{guild.id}/{guild.icon}.{guild.icon.startsWith('a_')
				? 'gif'
				: 'webp'}"
			draggable="false"
			alt={guild.name}
		/>
	{:else}
		<div>
			{guild.name
				.split(/[^a-zA-Z0-9]/)
				.map((x) => x[0])
				.join('')}
		</div>
	{/if}
</main>

<style lang="scss">
	main {
		aspect-ratio: 1;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border-radius: 0.85rem;
	}

	div {
		background-color: var(--neutral);
		flex: 1;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		flex: 1;
		width: 100%;
	}
</style>
