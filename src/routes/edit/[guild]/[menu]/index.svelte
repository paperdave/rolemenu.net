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
	import type { RoleMenu } from '$lib/api-types';
	import RoleMenuEditor from '$lib/components/RoleMenuEditor.svelte';
	import type { APIGuild } from 'discord-api-types/v10';
	import { roleMenuAPI } from '$lib/api-client';

	export let guild: APIGuild;
	export let menu: RoleMenu;
</script>

<main>
	<p>
		<a href="/edit/{guild.id}">go back</a>
	</p>
	{#if menu}
		<h1>edit this role menu:</h1>
		<RoleMenuEditor {menu} {guild} />
	{:else}
		<p>no menu found</p>
		<p>make it with /rolemenu create</p>
	{/if}
</main>

<style lang="scss">
</style>
