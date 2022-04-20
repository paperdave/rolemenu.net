<script context="module" lang="ts">
	import { get } from 'svelte/store';
	import type { RMGuildList } from '../api/guild-list';

	let cachedResponse;

	async function loadData() {
		if (cachedResponse) {
			return cachedResponse;
		}

		const response = (
			(await fetch(`/api/guild-list`, {
				headers: {
					Authorization: `Bearer ${get(session).token.access}`
				}
			}).then((res) => res.json())) as RMGuildList
		).sort((a, b) => {
			if (a.hasBot && !b.hasBot) {
				return -1;
			} else if (!a.hasBot && b.hasBot) {
				return 1;
			} else if (a.hasManageServer && !b.hasManageServer) {
				return -1;
			} else if (!a.hasManageServer && b.hasManageServer) {
				return 1;
			} else {
				return a.name.localeCompare(b.name);
			}
		});

		cachedResponse = response;

		return response;
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$lib/session';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!get(session)) {
			goto('/invite');
		}
	});

	const data = loadData();
</script>

<main>
	<h1>your guilds</h1>
	<p>listing all servers you have "Manage Roles" in.</p>
	{#await data}
		LOADING
	{:then guilds}
		<ul>
			{#each guilds as guild}
				<li>
					{#if guild.hasBot}
						<a href="/edit/{guild.id}">{guild.name}</a>
					{:else}
						<span>{guild.name}</span>
						{#if guild.hasManageServer}
							(<a href="/invite?guild={guild.id}">invite</a>)
						{:else}
							(ask owner to invite)
						{/if}
					{/if}
				</li>
			{/each}
		</ul>
	{/await}
</main>

<style lang="scss">
</style>
