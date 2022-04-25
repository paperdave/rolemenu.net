import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';
import 'dotenv/config';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapterCloudflare({
			define: Object.fromEntries(
				Object.entries(process.env)
					.filter(([key]) => !key.includes('('))
					.map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
					.concat([
						['process.env.NODE_ENV', JSON.stringify('production')],
						['process.env', JSON.stringify({})]
					])
			),
			banner: {
				// this fixes cloudflare builds. we provide a stub class so
				// https://github.com/ionic-team/rollup-plugin-node-polyfills/blob/master/polyfills/http-lib/capability.js#L20
				// runs fine.
				js: 'globalThis.XMLHttpRequest=class XMLHttpRequest{open(){}};'
			},
			plugins: [
				// these next three plugins are so @discord/rest compiles for the cloudflare worker.
				{
					name: 'node-awaitable-timers',
					setup(build) {
						build.onResolve({ filter: /timers\/promises/ }, () => ({
							path: require.resolve('awaitable-timers')
						}));
					}
				},
				{
					name: 'node-prefix',
					setup(build) {
						build.onResolve({ filter: /^node:.*$/ }, (args) => ({
							path: args.path.slice(5),
							namespace: 'node-modules-polyfills'
						}));
					}
				},
				NodeModulesPolyfillPlugin()
			],
			minify: true
		})
	}
};

export default config;
