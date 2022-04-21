<script context="module" lang="ts">
	import { get } from 'svelte/store';
	import type { RMGuildList } from '../api/me/guilds';
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$lib/session';
	import { onMount } from 'svelte';
	import { apiFetchGuildList } from '$lib/api-client';

	onMount(() => {
		if (!get(session)) {
			goto('/invite');
		}
	});

	const data = apiFetchGuildList();
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
