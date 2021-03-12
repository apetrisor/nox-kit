const sveltePreprocess = require('svelte-preprocess');

module.exports = {
	preprocess: sveltePreprocess({
		scss: {
			includePaths: ['src'],
		},
		postcss: true,
		preserve: ['ld+json'],
	}),
};
