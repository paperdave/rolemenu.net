<script lang="ts">
	import { browser } from '$app/env';

	import { roleMenuAPI } from '$lib/api-client';
	import { neverResolving } from '$lib/never-resolve';
	import GuildIcon from './GuildIcon.svelte';

	let guildsPromise = browser ? roleMenuAPI.getUserGuilds() : neverResolving;
</script>

<main>
	<a href="/edit" class="home">
		<svg viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5.2 12.05V8.15H7.8V12.05H11.05V6.85H13L6.5 1L0 6.85H1.95V12.05H5.2Z"
				fill="#72767D"
			/>
		</svg>
	</a>
	{#await guildsPromise}
		<!--  -->
	{:then guilds}
		{#each guilds.filter((guild) => guild.hasBot) as guild}
			<a href="/edit/{guild.id}" class="icon">
				<GuildIcon {guild} />
			</a>
		{/each}
	{/await}
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		width: 6rem;
		gap: 1.5rem;
		padding: 1.1rem;
		background-color: var(--dark);
	}
	.home {
		width: 100%;
		aspect-ratio: 1;
		border: 3px solid #72767d;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;

		svg {
			width: 2rem;
			height: 2rem;
			fill: var(--light);
		}
	}
</style>
