<script lang="ts">
	import { roleMenuAPI } from '$lib/api-client';

	import type { RMRoleMenu, RoleMenuMessageDef } from '$lib/api-types';
	import type { APIGuild, APIRole } from 'discord-api-types/v10';

	import copy from 'fast-copy';
	import equals from 'fast-deep-equal';
	import Button from './Button.svelte';
	import DiscordMessage from './DiscordMessage.svelte';

	export let menu: RoleMenuMessageDef;
	export let guild: APIGuild;

	let copied: RoleMenuMessageDef;
	function updateCopy() {
		copied = copy({ ...menu });
	}
	$: menu && updateCopy();

	$: changed = !equals(copied, menu);

	function filterRoles(roles: APIRole[], menu: RMRoleMenu) {
		const everyone = roles.find((x) => x.position === 0);
		const allowedPerms = BigInt(everyone.permissions);

		return guild.roles.filter(
			(x) =>
				x.position !== 0 &&
				!x.managed &&
				(BigInt(x.permissions) | allowedPerms) === allowedPerms &&
				!menu.roles.map((x) => x.role).includes(x.id)
		);
	}

	// $: availableRoles = filterRoles(guild.roles, copied);
</script>

<div class="root">
	<div class="button-row">
		<Button style="secondary">Reset</Button>
		<Button style="secondary">Reset</Button>
	</div>
	<h2>
		<input
			type="checkbox"
			checked={copied.message.embeds.length > 0}
			on:change={(ev) => {
				if (ev.currentTarget.checked) {
					copied.message.embeds = [
						{
							title: 'Role Menu'
						}
					];
				} else {
					copied.message.embeds = [];
				}
			}}
		/>
		Message Embed
	</h2>

	<div class="input-list">
		<label class="textlabel">
			<span> Title </span>
			<input type="text" bind:value={copied.message.embeds[0].title} />
		</label>
		<label class="textlabel">
			<span> Title </span>
			<input type="text" bind:value={copied.message.embeds[0].title} />
		</label>
	</div>
	<DiscordMessage message={copied.message} />
</div>

<style lang="scss">
	.button-row {
		display: flex;
	}
	.textlabel {
		display: flex;
		flex-direction: column;
	}
</style>
