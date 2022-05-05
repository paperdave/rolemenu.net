<script context="module" lang="ts">
</script>

<script lang="ts">
	import type { GuildPreview } from '$lib/api-types';
	import GuildIcon from '$lib/components/GuildIcon.svelte';

	export let guildList: GuildPreview[];
</script>

<main>
	<h1>
		Your Servers
		<span
			title={'Only showing servers you have the "Manage Roles" permission. In order to invite Role Menus to your server, you also require the "Manage Server" permission.'}
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 60 60"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M30.0058 4.08484C16.2209 4.08484 5.00586 15.4912 5.00586 29.5057C5.00586 43.5253 16.2209 54.9266 30.0058 54.9266C43.7908 54.9266 55.0058 43.5253 55.0058 29.5057C55.0058 15.4912 43.7908 4.08484 30.0058 4.08484ZM30.0058 45.3938C28.2808 45.3938 26.8808 43.9727 26.8808 42.2161C26.8808 40.4621 28.2808 39.0385 30.0058 39.0385C31.7308 39.0385 33.1308 40.4621 33.1308 42.2161C33.1308 43.9727 31.7308 45.3938 30.0058 45.3938ZM32.5058 34.2721V37.132H27.5058V29.5057H30.0058C32.7658 29.5057 35.0058 27.2255 35.0058 24.4215C35.0058 21.6151 32.7658 19.3374 30.0058 19.3374C27.2458 19.3374 25.0058 21.6151 25.0058 24.4215H20.0059C20.0059 18.8162 24.4934 14.2532 30.0058 14.2532C35.5183 14.2532 40.0058 18.8162 40.0058 24.4215C40.0058 29.1524 36.8133 33.1384 32.5058 34.2721Z"
					fill="#99AAB5"
				/>
			</svg>
		</span>
	</h1>
	<div class="guilds">
		{#each guildList as guild}
			<svelte:element
				this={guild.hasBot || guild.hasManageGuild ? 'a' : 'div'}
				href={guild.hasBot
					? `/edit/${guild.id}`
					: guild.hasManageGuild
					? `/invite?guild=${guild.id}`
					: undefined}
				class="guild"
				class:faded={!guild.hasBot}
				class:uninvitable={!guild.hasBot && !guild.hasManageGuild}
			>
				<div class="icon">
					<GuildIcon {guild} />
				</div>
				<div class="text">
					<div class="name">{guild.name}</div>
					<div class="stats">
						{#if guild.hasBot}
							<span>
								<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M32.75 37.2601H17.75V33.4341H32.75V37.2601ZM40.25 29.6081H17.75V25.7821H40.25V29.6081ZM40.25 21.9561H17.75V18.1301H40.25V21.9561ZM43.5833 10.478H14.4167C12.1042 10.478 10.25 12.3698 10.25 14.7292V44.487C10.25 46.8349 12.1155 48.7382 14.4167 48.7382H43.5833C45.8845 48.7382 47.75 46.8349 47.75 44.487V14.7292C47.75 12.3698 45.875 10.478 43.5833 10.478Z"
										fill="#99AAB5"
									/>
								</svg>

								{guild.roleMenus || 'No'} Role Menu{#if guild.roleMenus !== 1}s{/if}
							</span>
						{:else if guild.hasManageGuild}
							<span class="red">
								<svg aria-hidden="true" viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
									/></svg
								>
								Bot not invited here, click here to setup.
							</span>
						{:else}
							<span class="red">
								<svg aria-hidden="true" viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
									/></svg
								>
								Bot not invited here, ask owner to invite.
							</span>
						{/if}
					</div>
				</div>
			</svelte:element>
		{/each}
	</div>
</main>

<style lang="scss">
	h1 {
		text-align: center;
	}
	.guilds {
		display: flex;
		flex-direction: column;
		max-width: 35rem;
		margin: 0 auto;
		gap: 1rem;
	}
	.guild {
		width: 100%;
		height: 6rem;
		padding: 1rem;
		display: flex;
		background-color: var(--dark);
		border-radius: var(--round);
		gap: 1rem;
		user-select: none;
		text-decoration: none;
		transition: opacity 0.2s ease, border-color 0.2s ease;
		border: 1px solid var(--dark);
		&:hover {
			border-color: var(--primary);
		}
		&:not(:hover).faded {
			opacity: 0.6;
		}
		&.uninvitable {
			cursor: not-allowed;
		}
	}
	.icon {
		height: 100%;
		aspect-ratio: 1;
	}
	.text {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		justify-content: center;
		font-size: 1.1rem;
	}
	.name {
		font-size: 1.3rem;
		font-family: 'Open Sauce One';
	}
	.stats {
		display: flex;
		& > span {
			display: flex;
			gap: 0.25rem;
			align-items: center;

			svg {
				height: 1.2rem;
				margin-left: -0.2rem;
			}
		}
	}
	.red {
		color: #ff6476;
	}
</style>
