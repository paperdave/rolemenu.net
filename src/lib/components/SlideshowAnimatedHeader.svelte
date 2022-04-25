<script lang="ts">
	import { fade } from 'svelte/transition';

	export let text: string;

	const firstPart = 'Create simple, self-assignable role menus for';

	let isFirst = true;
	let delay = firstPart.length * 20 + 800;
	export let selectionDelay = 1700;

	function updateDelay() {
		if (isFirst) {
			isFirst = false;
		} else {
			delay = 400;
			selectionDelay = 550;
		}
	}

	$: text && updateDelay();
</script>

<span>
	{#each firstPart as char, i}
		<span class="char" style="animation-delay:{i * 20 + 800}ms">{char}</span>
	{/each}
	<strong class="highlighted">
		{#key text}
			<span out:fade|local={{ duration: 100 }}>
				{#each text + '.' as char, i}
					<span
						class="char"
						class:last={i === text.length}
						style="animation-delay:{i * 20 + delay}ms">{char}</span
					>
				{/each}
			</span>
		{/key}
	</strong>
</span>

<style lang="scss">
	.highlighted {
		color: var(--primary-bright);
	}
	.last {
		font-weight: normal;
		color: var(--text);
	}

	.char {
		animation: fadeIn 0.5s linear;
		animation-fill-mode: both;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			display: none;
		}
		0.1% {
			display: block;
		}
		100% {
			opacity: 1;
		}
	}
</style>
