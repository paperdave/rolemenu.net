import { PermissionFlagsBits } from 'discord-api-types/v10';

type PermissionCheckResolvable = string | bigint | { permissions: string | bigint };

export function hasPermission(permissions: PermissionCheckResolvable, check: bigint) {
	const permissionsBits = BigInt(
		typeof permissions === 'object' ? permissions.permissions : permissions
	);

	if ((PermissionFlagsBits.Administrator & permissionsBits) !== 0n) return true;
	return (permissionsBits & check) !== 0n;
}
