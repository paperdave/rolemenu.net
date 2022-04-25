<script lang="ts">
	import type { RoleMenuOption } from '$lib/api-types';
	import { getEmojiImageURL } from '$lib/emoji';

	export let item: Pick<RoleMenuOption, 'emoji' | 'label' | 'description'>;
	export let isLast: boolean;
	export let index: number;
	export let slideshow = false;
	export let delay = 1700;
</script>

{#if slideshow}
	<!--  -->
	{#key item.label + item.description}
		<div class="slideshow-transform" style="animation-delay:{index * 200 + delay}ms">
			<svelte:self {item} {isLast} {index} />
		</div>
	{/key}
{:else}
	<div class="selection" class:last={isLast} class:first={index === 0}>
		{#if item.emoji}
			<div class="icon">
				{#if String(item.emoji.id).match(/^[0-9]+$/)}
					<img
						draggable="false"
						src="https://cdn.discordapp.com/emojis/{item.emoji.id}.webp?size=24&quality=lossless"
						alt=":{item.emoji.name}:"
					/>
				{:else}
					<img draggable="false" src={getEmojiImageURL(item.emoji.name)} alt={item.emoji.name} />
				{/if}
			</div>
		{/if}
		<div class="info">
			<div class="label">{item.label}</div>
			{#if item.description}
				<div class="description">{item.description}</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	$round: 0.6rem;
	$borderSize: 0.2rem;

	.selection {
		display: flex;
		align-items: center;
		padding: 1rem;
		background: var(--bg);
		gap: 1rem;
		user-select: none;
		border: $borderSize solid var(--dark-2);
		border-top: none;

		&:not(.last) {
			border-bottom: none;
		}

		&.last {
			border-bottom-left-radius: $round;
			border-bottom-right-radius: $round;
		}
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

	.slideshow-transform {
		animation: in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
	}

	@keyframes in {
		0% {
			position: absolute;
			transform: scale(0.7);
			opacity: 0;
		}
		0.1% {
			position: relative;
		}

		100% {
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>
