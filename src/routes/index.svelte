<script lang="ts">
	import { session } from '$app/stores';
	import Selection from '$lib/components/Selection.svelte';
</script>

<header>
	<h1>Role Menus for Discord</h1>

	<div class="role-menu-visualizer">
		<div class="selector">
			<div class="content">
				Create simple, self-assignable roles for <strong class="purpose">notifications</strong>
			</div>
			<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M1.2682 2.63313C1.09246 2.45562 0.807538 2.45562 0.631802 2.63313C0.456066 2.81064 0.456066 3.09845 0.631802 3.27596L4.6818 7.36687C4.85754 7.54438 5.14246 7.54438 5.3182 7.36687L9.3682 3.27596C9.54393 3.09845 9.54393 2.81064 9.3682 2.63313C9.19246 2.45562 8.90754 2.45562 8.7318 2.63313L5 6.40263L1.2682 2.63313Z"
				/>
			</svg>
		</div>
		<div class="options">
			<Selection
				item={{
					label: 'YouTube Notifications',
					description: 'Get a ping when a new video goes up.',
					emoji: { id: '898284543730126899', name: 'davecode_green' }
				}}
			/>
			<Selection
				item={{
					label: 'YouTube Notifications',
					description: 'Get a ping when a new video goes up.',
					emoji: { id: '898284543730126899', name: 'davecode_green' }
				}}
			/>
			<Selection
				item={{
					label: 'YouTube Notifications',
					description: 'Get a ping when a new video goes up.',
					emoji: { id: '898284543730126899', name: 'davecode_green' }
				}}
			/>
		</div>
	</div>
</header>
<section>
	<div class="blank-space" />
	<p>
		Role Menus are a more modern version of traditional “reaction roles” systems, allowing for
		self-assignable roles on Discord servers. Easily customize their appearance and functionality to
		your liking with our web-based editor.
	</p>
	<a href="/invite"> Get Started </a>

	<div class="explainer-video-embed">
		<iframe
			title="YouTube video player"
			src="https://www.youtube-nocookie.com/embed/EiEuUF1Ang4"
			frameborder="0"
			allow="encrypted-media"
			allowfullscreen
		/>
	</div>
</section>

<style lang="scss">
	header {
		background-color: var(--primary);
		padding: 1rem;
		height: 25rem;
	}

	h1 {
		margin-top: 4rem;
		text-align: center;
		font-size: 3rem;
	}

	$round: 0.4rem;
	$borderSize: 0.2rem;

	.blank-space {
		height: 8rem;
	}

	.role-menu-visualizer {
		width: 35rem;
		margin: 0 auto;
		border-radius: $round;
		box-shadow: 0 0.18rem 2rem rgba(0, 0, 0, 0.5);
		font-size: 1.1rem;
	}

	.selector {
		background: var(--dark);
		border: $borderSize solid var(--dark-2);
		border-top-left-radius: $round;
		border-top-right-radius: $round;
		padding: 1rem;
		display: flex;
		align-items: center;

		strong {
			color: var(--primary-bright);
		}

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

	.options {
		border: $borderSize solid var(--dark-2);
		border-top: none;
		border-bottom-left-radius: $round;
		border-bottom-right-radius: $round;
		background-color: var(--bg);
		overflow: hidden;
	}
</style>
