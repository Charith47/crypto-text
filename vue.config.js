module.exports = {
	transpileDependencies: ['vuetify'],
	pages: {
		index: {
			entry: 'src/vue/main.js',
		},
	},
	pluginOptions: {
		electronBuilder: {
			mainProcessFile: 'src/electron/background.js',
		},
	},
};
