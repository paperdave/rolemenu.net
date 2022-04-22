<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { RoleMenu } from '$lib/api-types';
	import type { APIGuild } from 'discord-api-types/v10';
	import { roleMenuAPI } from '$lib/api-client';

	export const load: Load = async ({ fetch, params, session }) => {
		if (!session) {
			return {
				status: 302,
				redirect: '/invite'
			};
		}

		const { guild, roleMenus } = await roleMenuAPI.withOtherFetch(fetch).getGuildInfo(params.guild);

		return {
			props: {
				guild,
				roleMenus
			}
		};
	};
</script>

<script lang="ts">
	export let guild: APIGuild;
	export let roleMenus: RoleMenu[];
</script>

<main>
	<p>
		<a href="/edit">go back</a>
	</p>
	<h1>
		{guild.name}
	</h1>

	<h2>list of role menus</h2>

	<ul>
		{#each roleMenus as menu (menu.id)}
			<li>
				<a href="/edit/{guild.id}/{menu.id}">{menu.message}</a> <br />
				<pre><code>{JSON.stringify(menu, null, 2)}</code></pre>
			</li>
		{/each}
	</ul>
</main>

<style lang="scss">
</style>
