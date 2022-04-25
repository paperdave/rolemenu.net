<script lang="ts">
	import type { DisplayableRoleMenu } from '$lib/api-types';
	import { cubicIn } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	import SelectHeader from './SelectHeader.svelte';
	import Selection from './Selection.svelte';

	export let slideshow = false;
	export let menu: DisplayableRoleMenu;
	export let selectionDelay = 1700;
</script>

<div class="select-menu">
	<SelectHeader {slideshow} {menu} bind:selectionDelay />
	{#key slideshow && menu.message}
		<div out:fly|local={{ duration: 400, y: -50, opacity: 0, easing: cubicIn }}>
			{#each menu.roles as option, i}
				<Selection
					{slideshow}
					index={i}
					item={option}
					isLast={i === menu.roles.length - 1}
					delay={selectionDelay}
				/>
			{/each}
		</div>
	{/key}
</div>

<style lang="scss">
	$round: 0.6rem;
	$borderSize: 0.2rem;

	.select-menu {
		width: 35rem;
		border-radius: $round;
		font-size: 1.1rem;
		filter: drop-shadow(0 0.18rem 2rem rgba(0, 0, 0, 0.5));
	}
</style>
