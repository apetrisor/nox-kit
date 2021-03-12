const tailwind = require('tailwindcss');
const cssnano = require('cssnano');
const presetEnv = require('postcss-preset-env')({
	features: {
		// enable nesting
		'nesting-rules': true,
	},
});

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

module.exports = {
	plugins: [
		tailwind,
		presetEnv,
		// TODO - cssnano is not currently compatible with PostCSS8, wait till they update it
		// !dev && cssnano,
	],
};
