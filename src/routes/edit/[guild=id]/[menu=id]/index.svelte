<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, params, session }) => {
		if (!session) {
			return {
				status: 302,
				redirect: '/invite'
			};
		}

		const guild = await roleMenuAPI.withOtherFetch(fetch).getGuild(params.guild);
		const menu = await roleMenuAPI.withOtherFetch(fetch).getRoleMenu(params.guild, params.menu);

		return {
			props: {
				guild,
				menu
			}
		};
	};
</script>

<script lang="ts">
	import type { RoleMenuMessageDef } from '$lib/api-types';
	import RoleMenuEditor from '$lib/components/RoleMenuEditor.svelte';
	import type { APIGuild } from 'discord-api-types/v10';
	import { roleMenuAPI } from '$lib/api-client';
	import { browser } from '$app/env';

	export let guild: APIGuild;
	export let menu: RoleMenuMessageDef;
</script>

<section>
	{#if menu}
		{#if browser}
			<RoleMenuEditor {guild} {menu} />
		{/if}
	{:else}
		<h1>Error: Role Menu Not Found</h1>
		<p>
			<a href="/edit/{guild.id}">Go Back</a>
		</p>
	{/if}
</section>

<style lang="scss">
	h1 {
		margin: 0;
	}
	section {
		padding: 2rem;
		display: flex;
		flex-direction: column;
	}
</style>
