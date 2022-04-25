<script context="module" lang="ts">
	import type { DisplayableRoleMenu } from '$lib/api-types';

	import RoleMenu from './RoleMenu.svelte';

	// in these rolemenus, placeholder is ignored, and message is the highlighted portion of
	// "Create simple, self-assignable menus for <TEXT>"

	const menus: DisplayableRoleMenu[] = [
		{
			message: 'notifications',
			placeholder: '',
			style: 'default',
			multi: true,
			roles: [
				{
					label: 'YouTube Notifications',
					description: 'Get a ping when a new video goes up.',
					emoji: { name: 'youtube', id: '967989211091308575' }
				},
				{
					label: 'Twitch Notifications',
					description: 'Get a ping when the stream starts.',
					emoji: { name: 'twitch', id: '968118564118741003' }
				},
				{
					label: 'Game Night',
					description: 'Get a ping right before the weekly game night.',
					emoji: { name: '🎮', id: null }
				}
			]
		},
		{
			message: 'channel access',
			placeholder: '',
			style: 'default',
			multi: true,
			roles: [
				{
					label: 'Cooking',
					description: 'Share recipes and results of all your favorite dishes.',
					emoji: { name: '🍳', id: null }
				},
				{
					label: 'Board Games',
					description: 'Discuss new and old board games you love.',
					emoji: { name: '♟️', id: null }
				},
				{
					label: 'Plants',
					description: 'Tips and tricks on how to grow plants.',
					emoji: { name: '🌱', id: null }
				}
			]
		},
		{
			message: 'user tags',
			placeholder: '',
			style: 'default',
			multi: true,
			roles: [
				{
					label: 'Artist',
					emoji: { name: '🎨', id: null }
				},
				{
					label: 'Streamer',
					emoji: { name: '📺', id: null }
				},
				{
					label: 'Writer',
					emoji: { name: '📝', id: null }
				},
				{
					label: 'Musician',
					emoji: { name: '🎵', id: null }
				}
			]
		},
		{
			message: 'pronouns',
			placeholder: '',
			style: 'default',
			multi: false,
			roles: [
				//
				{ label: 'she/her' },
				{ label: 'he/him' },
				{ label: 'they/them' },
				{ label: 'other' }
			]
		}
	];
</script>

<script lang="ts">
	let i = 0;

	setInterval(() => {
		i = (i + 1) % menus.length;
	}, 8000);
</script>

<RoleMenu slideshow menu={menus[i]} />
