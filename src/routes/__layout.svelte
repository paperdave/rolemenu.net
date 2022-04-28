<script>
	import Footer from '$lib/components/Footer.svelte';

	import '../app.scss';
</script>

<main>
	<slot />
</main>
<Footer />

<style>
	main {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
</style>
