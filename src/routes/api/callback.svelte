<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import { session, initSession } from '$lib/session';
	import { onMount } from 'svelte';

	const code = $page.url.searchParams.get('code') || '';
	const guild_id = $page.url.searchParams.get('guild_id') || '';

	let error: string | null = null;

	onMount(async () => {
		if ($page.url.searchParams.get('error') === 'access_denied') {
			if ($session) {
				goto('/edit');
			} else {
				goto('/');
			}
		}

		const newSession = await fetch('/api/callback-logic', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code,
				guild_id
			})
		}).then((res) => res.json());

		if (newSession.error) {
			error = newSession.error;
			return;
		}

		initSession(newSession);

		goto('/edit');
	});
</script>

<noscript>
	<h1>you need javascript installed to use this</h1>
</noscript>

<div>
	{code}
</div>
