<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { RoleMenuMessageDef } from '$lib/api-types';
	import type { APIGuild, APIPartialChannel } from 'discord-api-types/v10';
	import { roleMenuAPI } from '$lib/api-client';

	export const load: Load = async ({ fetch, params, session }) => {
		if (!session) {
			return {
				status: 302,
				redirect: '/invite'
			};
		}

		const { guild, roleMenus, channels } = await roleMenuAPI
			.withOtherFetch(fetch)
			.getGuildInfo(params.guild);

		return {
			props: {
				guild,
				roleMenus,
				channels
			}
		};
	};
</script>

<script lang="ts">
	import ChannelIcon from '$lib/components/ChannelIcon.svelte';

	export let hasAdmin: boolean;
	export let guild: APIGuild;
	export let roleMenus: RoleMenuMessageDef[];
	export let channels: APIPartialChannel[];

	$: sorted = channels
		.map((c) => {
			return {
				channel: c,
				roleMenus: roleMenus
					.filter((rm) => rm.channel === c.id)
					.sort((a, b) => Number(BigInt(a.id) - BigInt(b.id)))
			};
		})
		.filter((c) => c.roleMenus.length > 0);
</script>

<main>
	<h1>
		{guild.name}
	</h1>

	{#if }

	<h2>list of role menus</h2>

	{#if sorted.length === 0}
		<p>no role menus</p>
	{:else}
		{#each sorted as { channel, roleMenus }}
			<p>
				<ChannelIcon {channel} {guild} />
				{channel.name}
			</p>
			{#each roleMenus as roleMenu}
				<a href="/edit/{guild.id}/{roleMenu.id}">
					{roleMenu.id}
				</a>
			{/each}
		{/each}
	{/if}
	<!-- {#each roleMenus as menu (menu.id)}
			<li>
				<a href="/edit/{guild.id}/{menu.id}">{menu.message}</a> <br />
				<pre><code>{JSON.stringify(menu, null, 2)}</code></pre>
			</li>
		{/each} -->
</main>

<style lang="scss">
</style>
