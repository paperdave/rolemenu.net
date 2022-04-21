<script lang="ts">
	import { page } from '$app/stores';
	import { apiFetchRoleMenuList, roleMenuListCache } from '$lib/api-client';
	import RoleMenuEditor from '$lib/components/RoleMenuEditor.svelte';

	$: guildId = $page.params.guild;
	$: menuId = $page.params.menu;

	$: rmListCached = roleMenuListCache.get(guildId) as RoleMenuList;
	$: dataPromise = (
		rmListCached ? Promise.resolve(rmListCached) : apiFetchRoleMenuList(guildId)
	).then((data) => {
		return {
			guild: data.guild,
			menu: data.roleMenus.find((x) => x.id === menuId)
		};
	});
</script>

<main>
	<p>
		<a href="/edit/{guildId}">go back</a>
	</p>
	{#await dataPromise}
		...
	{:then { menu, guild }}
		{#if menu}
			<h1>edit this role menu:</h1>
			<RoleMenuEditor {menu} {guild} />
		{:else}
			<p>no menu found</p>
			<p>make it with /rolemenu create</p>
		{/if}
	{/await}
</main>

<style lang="scss">
</style>
