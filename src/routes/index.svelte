<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import RoleMenu from '$lib/components/RoleMenu.svelte';
	import RoleMenuExamples from '$lib/components/RoleMenuExamples.svelte';
</script>

<header>
	<h1>Role Menus for Discord</h1>

	<div class="center">
		<RoleMenuExamples />
	</div>
</header>
<section>
	<div class="blank-space" />
	<article>
		<p class="first-para">
			Role Menus are a more modern version of traditional “reaction roles” systems, allowing for
			self-assignable roles on Discord servers. Easily customize their appearance and functionality
			to your liking with our web-based editor.
		</p>

		<div class="button-row">
			<!-- <Button href="/invite">Get Started</Button>
			<Button href="/docs" style="link">Documentation</Button> -->
			<br /><br /><br /><br /><br /> Coming Soon...
		</div>

		<!-- <h2>How does it work?</h2>
		<div class="explainer-video-embed">
			<iframe
				title="YouTube video player"
				src="https://www.youtube-nocookie.com/embed/TJ13BA3-NR4"
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

	$round: 0.6rem;

	.blank-space {
		height: 4rem;
	}

	article {
		max-width: 50rem;
		margin: 0 auto;
	}

	.first-para {
		font-size: 1.4rem;
		font-weight: 500;
		text-align: center;
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
			border-radius: 0.5rem;
		}
	}
</style>
