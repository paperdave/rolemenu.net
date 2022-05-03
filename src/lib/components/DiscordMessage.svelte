<script lang="ts">
	import { ButtonStyle, ComponentType, type APIMessage } from 'discord-api-types/v10';
	import Button from './Button.svelte';

	export let message: Pick<APIMessage, 'content' | 'embeds' | 'components'>;
</script>

<main>
	{#if message.content}
		<div class="content">
			{message.content}
		</div>
	{/if}

	{#each message.embeds ?? [] as embed}
		<div class="embed" style="--embed-color:#{(embed.color ?? 0x202225).toString(16)}">
			{#if embed.title}
				<div class="title embed-margin">
					{embed.title}
				</div>
			{/if}

			{#if embed.description}
				<div class="description embed-margin">
					{embed.description}
				</div>
			{/if}

			{#if embed.author}
				<div class="description embed-margin">
					<img class="author-img" src={embed.author.icon_url} alt={embed.author.name} />
					<span class="author-name">
						{embed.author.name}
					</span>
				</div>
			{/if}
		</div>
	{/each}

	{#each message.components ?? [] as row}
		<div class="row">
			{#each row.components as component}
				{#if component.type === ComponentType.Button}
					<Button
						style={{
							[ButtonStyle.Primary]: 'primary',
							[ButtonStyle.Secondary]: 'secondary',
							[ButtonStyle.Danger]: 'danger',
							[ButtonStyle.Success]: 'success',
							[ButtonStyle.Link]: 'link'
						}[component.style]}
					>
						{component.label}
					</Button>
				{:else if component.type === ComponentType.SelectMenu}
					<div class="select-menu">
						<div class="select-menu-placeholder">
							{component.placeholder}
						</div>
						<svg
							class="select-menu-icon"
							aria-hidden="false"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"
							/></svg
						>
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		font-size: 14px;
		gap: 8px;
	}
	.embed {
		background-color: #2f3136;
		border-left: 4px solid var(--embed-color, #202225);
		border-radius: 4px;
		padding: 8px 16px 16px 12px;
		max-width: 520px;
	}
	.embed-margin {
		margin-top: 8px;
	}
	.title {
		font-weight: bold;
		font-size: 16px;
	}
	.author {
		display: flex;
	}
	.author-img {
		width: 24px;
		height: 24px;
		margin-right: 8px;
	}
	.author-name {
		font-size: 14px;
		font-weight: bold;
	}
	.select-menu {
		background: #202225;
		border-radius: 4px;
		height: 42px;
		padding: 8px;
		border: 1px solid #202225;
		display: flex;
		font-weight: bold;
		max-width: 400px;
		align-items: center;
	}
	.select-menu-placeholder {
		flex: 1;
		color: #a3a6aa;
		font-weight: normal;
	}
</style>
