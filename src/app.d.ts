/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		session?: {
			access: string;
			refresh: string;
		};
		userDiscordRest?: import('@discordjs/rest').REST;
	}
	interface Session {
		authorized: true;
	}
	// interface Platform {}
	// interface Stuff {}
}
