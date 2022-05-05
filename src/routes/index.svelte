<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
</script>

<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import RoleMenuExamples from '$lib/components/RoleMenuExamples.svelte';
	import Button from '$lib/components/Button.svelte';
	import { session } from '$app/stores';

	export let roleMenuCount: number = 0;
	export let serverCount: number = 0;
</script>

<Meta />

<header>
	<h1>Role Menus for Discord</h1>

	<div class="center">
		<RoleMenuExamples />
	</div>
</header>
<section>
	<div class="blank-space" />
	<article>
		<p class="big">
			Role Menus are a more modern version of traditional “reaction roles” systems, allowing for
			self-assignable roles on Discord servers. Easily customize their appearance and functionality
			to your liking with our web-based editor.
		</p>
		<p class="big">
			To date, {roleMenuCount} role menus have been created in {serverCount} servers.
		</p>

		<div class="button-row">
			{#if $session}
				<Button href="/edit">Go to Dashboard</Button>
			{:else}
				<Button href="/login">Get Started</Button>
			{/if}
		</div>

		<!-- <h2>How does it work?</h2>
		<div class="explainer-video-embed">
			<iframe
				title="YouTube video player"
				src="https://www.youtube-nocookie.com/embed/"
				frameborder="0"
				allow="encrypted-media"
				allowfullscreen
			/>
		</div> -->
	</article>
</section>

<style lang="scss">
	header {
		background-color: var(--primary);
		padding: 1rem;
		height: 25rem;
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h1 {
		margin-top: 4rem;
		text-align: center;
		font-size: 3rem;
	}

	.blank-space {
		height: 4rem;
	}

	article {
		max-width: 50rem;
		margin: 0 auto;
	}

	.big {
		font-size: 1.4rem;
		font-weight: 400;
		text-align: center;
		margin-bottom: 2rem;
	}

	.button-row {
		margin: 1em 0;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.explainer-video-embed {
		margin-top: 1rem;

		width: 100%;
		display: flex;
		& > * {
			width: 100%;
			aspect-ratio: 16/9;
			border: 2px solid var(--dark-2);
			border-radius: var(--round);
		}
	}
</style>
