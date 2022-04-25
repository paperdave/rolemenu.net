<script lang="ts">
	export let href: string | undefined = undefined;

	export let style: 'custom' | 'primary' | 'secondary' | 'danger' | 'success' | 'link' = 'custom';
</script>

<a
	{href}
	class="root"
	class:custom={style === 'custom'}
	class:primary={style === 'primary'}
	class:secondary={style === 'secondary'}
	class:danger={style === 'danger'}
	class:success={style === 'success'}
	class:link={style === 'link'}
>
	<slot />
	{#if style === 'link'}
		<svg class="link-svg" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M5.50009 0.499695H9.00015V3.99975H8.00014V2.20672L3.85356 6.35328L3.14654 5.64627L7.29312 1.49971H5.50009V0.499695ZM3.50006 0.500153V1.50017H1.00002V8.50029H8.00014V6.00025H9.00015V8.31278C9.00015 8.9683 8.46814 9.50031 7.81263 9.50031H1.18752C0.532604 9.50031 0 8.9683 0 8.31278V1.68767C0 1.03276 0.532604 0.500153 1.18752 0.500153H3.50006Z"
				fill="white"
			/>
		</svg>
	{/if}
</a>

<style lang="scss">
	.root {
		padding: 0.7rem 1.15rem;
		border-radius: 0.35rem;
		text-decoration: none;
		position: relative;
		cursor: pointer;
		display: flex;

		--overlay: 0%;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: hsl(0, 0%, var(--overlay));
			opacity: 0;
			border-radius: 0.35rem;
			transition: opacity 0.2s ease-in-out;
		}

		&:hover::after {
			opacity: 0.1;
		}

		&:active::after {
			opacity: 0.25;
		}
	}

	.secondary,
	.link {
		--overlay: 100%;
	}

	.custom {
		background-color: var(--primary);
		color: var(--text);
	}

	.secondary,
	.link {
		background-color: #4f545c;
		color: #fff;
	}

	.success {
		color: #3ba55c;
	}

	.danger {
		color: #ed4245;
	}

	.primary {
		color: #5865f2;
	}

	.link-svg {
		width: 1rem;
		margin-left: 0.5rem;
	}
</style>
