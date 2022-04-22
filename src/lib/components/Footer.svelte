<footer>
	<div>
		<span>rolemenu.net is not affiliated with Discord</span>
		<span>
			made with <span class="red">&lt;3</span> by <a href="https://davecode.net">dave caruso</a>
		</span>
	</div>
	<nav>
		<a href="https://discord.gg/4AbvSXV">my server</a>
		<a href="/privacy">privacy policy</a>
	</nav>
</footer>

<style lang="scss">
	footer {
		display: flex;
		padding: 1.5rem;
		background-color: var(--dark);
		align-items: center;
	}

	div {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	nav {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.red {
		color: red;
	}

	@media (max-width: 768px) {
		footer {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		nav,
		div {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
