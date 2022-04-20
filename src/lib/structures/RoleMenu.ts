import { Structure, types, type Instance } from '@davecode/structures';
import type { MessageSelectOptionData } from 'discord.js';
import { JSONDataType } from './utils';

export const RoleMenu = new Structure('RoleMenu')
	.prop('id', types.String)
	.prop('channel', types.String)
	.prop('guild', types.String)
	.prop('placeholder', types.String, { default: 'Select a role' })
	.prop('multi', types.Boolean, { default: false })
	.prop('message', types.String, { default: 'Role Menu' })
	.prop('roles', types.ArrayOf(JSONDataType<MessageSelectOptionData>()), { default: [] })
	.create();

export type RoleMenu = Instance<typeof RoleMenu>;
