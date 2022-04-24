<script context="module" lang="ts">
	import { roleMenuAPI } from '$lib/api-client';

	export const load: Load = async ({ fetch, session }) => {
		if (!session) {
			return {
				status: 302,
				redirect: '/invite'
			};
		}

		const guildList = await roleMenuAPI.withOtherFetch(fetch).getUserGuilds();

		return {
			props: {
				guildList
			}
		};
	};
</script>

<script lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { GuildPreview } from '$lib/api-types';

	export let guildList: GuildPreview[];
</script>

<main>
	<h1>your guilds</h1>
	<p>listing all servers you have "Manage Roles" in.</p>
	<ul>
		{#each guildList as guild}
			<li>
				{#if guild.hasBot}
					<a href="/edit/{guild.id}">{guild.name}</a>
				{:else}
					<span>{guild.name}</span>
					{#if guild.hasManageGuild}
						(<a href="/invite?guild={guild.id}">invite</a>)
					{:else}
						(ask owner to invite)
					{/if}
				{/if}
			</li>
		{/each}
	</ul>
</main>

<style lang="scss">
</style>
