<script lang="ts">
	import { roleMenuAPI } from '$lib/api-client';

	import type { RMRoleMenu, RoleMenuMessageDef } from '$lib/api-types';
	import type { APIGuild, APIRole } from 'discord-api-types/v10';

	import copy from 'fast-copy';
	import equals from 'fast-deep-equal';

	export let menu: RMRoleMenu;
	export let guild: APIGuild;

	let copied: RMRoleMenu;
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

	$: availableRoles = filterRoles(guild.roles, copied);
</script>

<main />

<style lang="scss">
</style>
