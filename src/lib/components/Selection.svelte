<script lang="ts">
	import type { RoleMenuOption } from '$lib/api-types';

	export let item: Pick<RoleMenuOption, 'emoji' | 'label' | 'description'>;
</script>

<div class="selection">
	{#if item.emoji}
		<div class="icon">
			<!--  -->
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
		background: var(--background);
	}
</style>
