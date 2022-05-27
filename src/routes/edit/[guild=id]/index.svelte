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

		const { guild, roleMenus, channels, isAdmin } = await roleMenuAPI
			.withOtherFetch(fetch)
			.getGuildInfo(params.guild);

		return {
			props: {
				guild,
				roleMenus,
				channels,
				isAdmin
			}
		};
	};
</script>

<script lang="ts">
	import ChannelIcon from '$lib/components/ChannelIcon.svelte';
	import DiscordMessage from '$lib/components/DiscordMessage.svelte';
	import { renderRoleMenuMessage } from '$lib/render-message';

	export let isAdmin: boolean;
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

	$: expanded = sorted.map(() => true);
</script>

<section>
	<h1>{guild.name}</h1>

	{#if !isAdmin}
		<div class="notice">
			Note: The bot does not have the "Administrator" permission on this server, which may cause
			issues updating role menus in locked channels.
		</div>
	{/if}

	{#if sorted.length === 0}
		<p>No Role Menus! Create one by running the "/role-menu create" application command.</p>
	{:else}
		{#each sorted as { channel, roleMenus }, i}
			<div
				class="channel"
				on:click={() => {
					expanded[i] = !expanded[i];
				}}
			>
				<svg
					class="chevron"
					viewBox="0 0 60 60"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					style="transform:rotate({expanded[i] ? 180 : 90}deg)"
				>
					<path
						d="M32.6942 14.2229L58.9215 39.266C60.359 40.724 60.359 42.9538 58.9215 44.326C57.4845 45.6983 55.149 45.6983 53.622 44.326L29.9996 21.7704L6.37687 44.326C4.93973 45.6983 2.51459 45.6983 1.07749 44.326C-0.359652 42.9538 -0.359652 40.724 1.07749 39.266L27.3948 14.2229C28.8319 12.8509 31.1672 12.8509 32.6942 14.2229Z"
						fill="#99AAB5"
					/>
				</svg>

				<ChannelIcon {channel} {guild} />
				{channel.name}
			</div>
			{#if expanded[i]}
				{#each roleMenus as roleMenu}
					<a class="message-container" href="/edit/{guild.id}/{roleMenu.id}">
						<DiscordMessage message={renderRoleMenuMessage(roleMenu)} />
					</a>
				{/each}
			{/if}
		{/each}
	{/if}
</section>

<style lang="scss">
	h1 {
		font-size: 2.5rem;
		margin: 0;
	}
	section {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		overflow-y: auto;
		gap: 1rem;
		width: 100%;
	}
	.notice {
		color: #ed4245;
		border: 2px solid #ed4245;
		background-color: #ed424522;
		padding: 1rem;
		border-radius: var(--round);
	}
	.channel {
		display: flex;
		height: 2.5rem;
		padding: 0.5rem;
		align-items: center;
		gap: 0.25rem;
		background-color: var(--dark);
		border-radius: var(--round);
		user-select: none;
		cursor: pointer;
	}
	.chevron {
		width: 1rem;
		margin-left: 0.2rem;
		margin-right: 0.1rem;
		transition: transform 0.2s ease-in-out;
	}
	.message-container {
		display: flex;
		flex-direction: column;
		border-left: 2px solid var(--primary);
		padding: 10px;
		margin-left: 10px;
		user-select: none;
		position: relative;
		text-decoration: none;
		cursor: pointer;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: var(--primary);
			opacity: 0;
			transition: opacity 0.2s ease-in-out;
		}

		&:hover {
			&::before {
				opacity: 0.2;
			}
		}

		&:active {
			color: unset;

			&::before {
				opacity: 0.4;
			}
		}
	}
</style>
