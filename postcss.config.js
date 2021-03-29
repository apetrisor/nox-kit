const tailwind = require('tailwindcss');
const csso = require('postcss-csso');
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
		tailwind({config: './node_modules/@apetrisor/nox-kit/tailwind.config.js'}),
		presetEnv,
		//
		!dev && csso(),
	],
};
