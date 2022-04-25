import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';
import 'dotenv/config';
import alias from 'esbuild-plugin-alias';
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
				// and some other things properly run.
				js: [
					'globalThis.XMLHttpRequest=class{open(){}};',
					'globalThis.location={};',
					'globalThis.process={version:"16, Cloudflare Workers",nextTick:(f)=>setTimeout(f)};',
					`((_set,_clear)=>{
						globalThis.setTimeout=(...args)=>({unref(){},value:_set(...args)});
						globalThis.clearTimeout=(x)=>_clear(x && x.value || x);
					})(setTimeout,clearTimeout);`,
					`((_set,_clear)=>{
						globalThis.#$setInterval=(...args)=>({unref(){},value:_set(...args)});
						globalThis.#$clearInterval=(x)=>_clear(x && x.value || x);
					})(setInterval,clearInterval);`
				].join('')
			},
			plugins: [
				// these next three plugins are so @discord/rest compiles for the cloudflare worker.
				alias({
					'@prisma/client': require.resolve('@prisma/client')
				}),
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
			]
			// minify: true
		})
	}
};

export default config;
