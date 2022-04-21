<script lang="ts">
	import type {
		RoleMenuFullData,
		RoleMenuListGuild,
		RoleMenuListGuildRole
	} from 'src/routes/api/[guild]/role-menu-list';
	import copy from 'fast-copy';
	import equals from 'fast-deep-equal';
	import { apiPatchRoleMenu } from '$lib/api-client';

	export let menu: RoleMenuFullData;
	export let guild: RoleMenuListGuild;

	let copied: RoleMenuFullData;
	function updateCopy() {
		copied = copy(menu);
	}
	$: menu && updateCopy();

	$: changed = !equals(copied, menu);

	function filterRoles(roles: RoleMenuListGuildRole[], menu: RoleMenuFullData) {
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

	async function publish() {
		try {
			await apiPatchRoleMenu(copied);
		} catch (error) {
			alert(error);
			return;
		}
		alert('published');
		menu = copied;
	}
</script>

<main>
	changed: {changed}
	<button disabled={!changed} on:click={() => (menu = menu)}>reset</button>
	<button disabled={!changed} on:click={publish}>publish changes</button>
	<div class="flex">
		<div>
			<h2>main info</h2>
			<section>
				message: <input type="text" bind:value={copied.message} />
			</section>
			<section>
				placeholder text: <input
					type="text"
					bind:value={copied.placeholder}
					placeholder={copied.multi ? 'Select roles' : 'Select a role'}
				/>
			</section>
			<section>
				allow multiple: <input type="checkbox" bind:checked={copied.multi} />
			</section>
			<section>currently style is only "default"</section>
			<h2>add roles</h2>
			<select
				on:change={(ev) => {
					const roleId = ev.currentTarget.value;
					if (roleId === 'null') return;
					const role = guild.roles.find((x) => x.id === roleId);

					copied.roles = copied.roles.concat({
						id: 'null',
						role: role.id,
						label: role.name,
						description: '',
						emoji: '',
						roleMenuId: copied.id
					});
				}}
			>
				<option value="null">ADD A ROLE</option>
				{#each filterRoles(guild.roles, menu) as role}
					<option value={role.id}>{role.name}</option>
				{/each}
			</select>
			<p>
				note that only vanity roles will show up here (no perms or equal to what @everyone has).
			</p>
			<hr />
			<h2>roles in menu</h2>
			{#each copied.roles as role}
				<section>
					label: <input type="text" bind:value={role.label} />
				</section>
				<section>
					description: <input type="text" bind:value={role.description} />
				</section>
				<section>emoji: dont wanna deal with it rn</section>
				<section>
					grants role: {guild.roles.find((x) => x.id === role.role).name}
				</section>

				<section>
					<button on:click={() => (copied.roles = copied.roles.filter((x) => x !== role))}>
						remove
					</button>
				</section>
				<hr />
			{/each}
		</div>
		<div>
			<pre><code>{JSON.stringify(copied, null, 2)}</code></pre>
		</div>
	</div>
</main>

<style lang="scss">
	section {
		margin: 0.4rem 0;
	}
	.flex {
		display: flex;
		flex-direction: row;
		& > div {
			flex: 1;
		}
	}
</style>
