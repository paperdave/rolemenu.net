import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import 'dotenv/config';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			define: {
				'process.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL)
			}
		}
	}
};

export default config;
