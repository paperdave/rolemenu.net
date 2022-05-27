<script lang="ts">
	import GuildSidebar from '$lib/components/GuildSidebar.svelte';
</script>

<div>
	<GuildSidebar />
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		flex: 1;
	}
</style>
