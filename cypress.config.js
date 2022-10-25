const {defineConfig} = require('cypress');

module.exports = defineConfig({
	retries: 4,
	// specPattern: 'cypress/integration/**/*.js',
	video: false,
	screenshotOnRunFailure: false,
	chromeWebSecurity: false,
	reporter: 'cypress-multi-reporters',
	reporterOptions: {
		configFile: 'reporter-config.json'
	},
	// reporter: 'mochawesome',
	// reporterOptions: {
	// 	overwrite: false,
	// 	html: true,
	// 	json: true,
	// 	mochaFile: 'results/my-test-output-[hash].xml'
	// },
	defaultCommandTimeout: 4000,
	waitForAnimations: true,
	projectId: 'xq2qjw',
	e2e: {
		setupNodeEvents(on, config) {
			require('@cypress/code-coverage/task')(on, config);
			return config;
		},
		supportFile: 'cypress/support/index.js',
		specPattern: 'cypress/integration/**/*.js'
	}
});
