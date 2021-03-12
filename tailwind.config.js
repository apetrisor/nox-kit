module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		content: ['./src/**/*.svelte', './src/**/*.html'],
		options: {
			safelist: ['sm:w-1/2'],
		},
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			spaced: [{min: '868px', max: '1023px'}, {min: '1124px', max: '1279px'}, {min: '1380px'}],
		},
		container: {
			center: true,
			padding: '20px',
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
			},
		},
	},
	variants: {},
	plugins: [],
	corePlugins: {
		position: false,
	},
};
