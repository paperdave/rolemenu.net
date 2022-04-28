<script lang="ts">
	import type { DisplayableRoleMenu } from '$lib/api-types';
	import SlideshowAnimatedHeader from './SlideshowAnimatedHeader.svelte';

	export let slideshow = false;
	export let menu: DisplayableRoleMenu;
	export let selectionDelay: number;
</script>

<div class="selector" class:slideshow>
	<div class="content">
		{#if slideshow}
			<SlideshowAnimatedHeader text={menu.placeholder} bind:selectionDelay />
		{:else}
			<h2>{menu.placeholder}</h2>
		{/if}
	</div>
	<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M1.2682 2.63313C1.09246 2.45562 0.807538 2.45562 0.631802 2.63313C0.456066 2.81064 0.456066 3.09845 0.631802 3.27596L4.6818 7.36687C4.85754 7.54438 5.14246 7.54438 5.3182 7.36687L9.3682 3.27596C9.54393 3.09845 9.54393 2.81064 9.3682 2.63313C9.19246 2.45562 8.90754 2.45562 8.7318 2.63313L5 6.40263L1.2682 2.63313Z"
		/>
	</svg>
</div>

<style lang="scss">
	$borderSize: 0.2rem;
	$round: 0.6rem;

	.selector {
		background: var(--dark);
		border: $borderSize solid var(--dark-2);
		border-top-left-radius: $round;
		border-top-right-radius: $round;
		padding: 1rem;
		display: flex;
		align-items: center;
		z-index: 100;
		position: relative;

		.content {
			flex: 1;
		}

		svg {
			width: 1.2rem;
			height: 1.2rem;
			margin-left: auto;
			fill: var(--text);
		}
	}

	.slideshow {
		animation: border-radius-change 0.35s ease-in-out 2000ms both;
	}

	@keyframes border-radius-change {
		0% {
			border-bottom-left-radius: $round;
			border-bottom-right-radius: $round;
		}
		100% {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
	}
</style>
