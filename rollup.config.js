import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import alias from '@rollup/plugin-alias';
import path from 'path';
const {preprocess} = require('./svelte.config');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	(warning.code === 'PLUGIN_WARNING' && warning.pluginCode === 'a11y-no-onchange') ||
	onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			alias({
				resolve: ['.js', '.svelte'], // optional, by default this will just look for .js files or folders
				entries: [
					{find: 'components', replacement: path.resolve(__dirname, 'src/components')},
					{find: 'lib', replacement: path.resolve(__dirname, 'src/lib')},
					{find: 'models', replacement: path.resolve(__dirname, 'src/models')},
				],
			}),
			replace({
				values: {
					'process.browser': true,
					'process.env.NODE_ENV': JSON.stringify(mode),
					'process.assetsUrl': JSON.stringify(process.env.ASSETS_URL),
					'process.safeMode': process.env.SAFE_MODE === 'true' ? true : false,
				},
				preventAssignment: false,
			}),
			svelte({
				compilerOptions: {
					dev,
					hydratable: true,
				},
				emitCss: true,
				preprocess,
			}),
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),
			commonjs(),

			legacy &&
				babel({
					extensions: ['.js', '.mjs', '.html', '.svelte'],
					babelHelpers: 'runtime',
					exclude: ['node_modules/@babel/**'],
					presets: [
						[
							'@babel/preset-env',
							{
								targets: '> 0.25%, not dead',
							},
						],
					],
					plugins: [
						'@babel/plugin-syntax-dynamic-import',
						[
							'@babel/plugin-transform-runtime',
							{
								useESModules: true,
							},
						],
					],
				}),

			!dev &&
				terser({
					module: true,
				}),
		],

		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			alias({
				resolve: ['.js', '.svelte'], // optional, by default this will just look for .js files or folders
				entries: [
					{find: 'components', replacement: path.resolve(__dirname, 'src/components')},
					{find: 'lib', replacement: path.resolve(__dirname, 'src/lib')},
					{find: 'models', replacement: path.resolve(__dirname, 'src/models')},
				],
			}),
			replace({
				values: {
					'process.browser': false,
					'process.env.NODE_ENV': JSON.stringify(mode),
					'process.assetsUrl': JSON.stringify(process.env.ASSETS_URL),
					'process.safeMode': process.env.SAFE_MODE === 'true' ? true : false,
				},
				preventAssignment: false,
			}),
			svelte({
				compilerOptions: {
					dev,
					generate: 'ssr',
					hydratable: true,
				},
				emitCss: false,
				preprocess,
			}),
			resolve({
				dedupe: ['svelte'],
			}),
			commonjs(),
		],
		external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),

		preserveEntrySignatures: 'strict',
		onwarn,
	},
};
