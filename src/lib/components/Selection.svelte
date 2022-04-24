<script lang="ts">
	import type { RoleMenuOption } from '$lib/api-types';

	export let item: Pick<RoleMenuOption, 'emoji' | 'label' | 'description'>;
</script>

<div class="selection">
	{#if item.emoji}
		<div class="icon">
			<img
				src="https://cdn.discordapp.com/emojis/{item.emoji.id}.webp?size=24&quality=lossless"
				alt=":{item.emoji.name}:"
			/>
		</div>
	{/if}
	<div class="info">
		<div class="label">{item.label}</div>
		{#if item.description}
			<div class="description">{item.description}</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.selection {
		display: flex;
		align-items: center;
		padding: 1rem;
		background: var(--bg);
		gap: 1rem;
	}
	.label {
		font-weight: bold;
	}
	.description {
		opacity: 0.75;
	}
	.icon {
		width: 1.5rem;
		display: flex;
		position: relative;

		img {
			width: 100%;
		}
	}
</style>
