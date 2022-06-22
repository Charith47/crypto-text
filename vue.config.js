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
			// pretend you didn't see this
			nodeIntegration: true,
		},
	},
};
