import { writable, type Writable } from 'svelte/store';

export interface Session {
	token: SessionToken;
}

export interface SessionToken {
	access: string;
	refresh: string;
	accessExpires: number;
	refreshExpires: number;
}

export const session: Writable<Session | null> = writable(
	typeof window !== 'undefined' && JSON.parse(localStorage.getItem('RoleMenu.session') || 'null')
);

export function initSession(token: SessionToken) {
	session.set({ token: token });
	localStorage.setItem('RoleMenu.session', JSON.stringify({ token }));
}
