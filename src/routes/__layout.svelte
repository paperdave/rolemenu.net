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
		flex: 1;
	}
</style>
