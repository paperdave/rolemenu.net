<script lang="ts">
	import { page } from '$app/stores';
	import { apiFetchGuild, apiFetchRoleMenuList, guildListCache } from '$lib/api-client';
	import type { RMGuildList } from 'src/routes/api/@me/guilds';

	const guildList = guildListCache.get('guilds') as RMGuildList;

	$: guildId = $page.params.guild;
	$: dataPromise = apiFetchRoleMenuList(guildId);
</script>

<main>
	<p>
		<a href="/edit">go back</a>
	</p>
	<h1>
		{#if guildList}
			{guildList.find((x) => x.id === guildId).name}
		{:else}
			{#await dataPromise}
				...
			{:then { guild }}
				{guild.name}
			{/await}
		{/if}
	</h1>

	<h2>list of role menus</h2>

	{#await dataPromise}
		...
	{:then { guild, roleMenus }}
		<ul>
			{#each roleMenus as menu (menu.id)}
				<li>
					<a href="/edit/{guild.id}/{menu.id}">{menu.message}</a> <br />
					<pre><code>{JSON.stringify(menu, null, 2)}</code></pre>
				</li>
			{/each}
		</ul>
	{/await}
</main>

<style lang="scss">
</style>
