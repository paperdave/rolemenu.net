<script lang="ts">
	import GuildSidebar from '$lib/components/GuildSidebar.svelte';
</script>

<main>
	<GuildSidebar />
	<slot />
</main>

<style lang="scss">
	main {
		display: flex;
		flex: 1;
	}
</style>
