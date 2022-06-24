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
			builderOptions: {
				productName: 'CryptoText',
				appId: 'crypto-tool-ce0009',
				copyright: 'Copyright 2022',
				buildVersion: '0.9.0',
				compression: 'maximum',
				directories: {
					buildResources: 'resources',
					output: 'bin/Desktop',
				},
				win:{
					icon:'./resources/icon.png'
				}
			},

		},
	},
};
