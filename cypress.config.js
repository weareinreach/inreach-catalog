const {
	defineConfig
} = require('cypress');

module.exports = defineConfig({
	retries: 4,
	integrationFolder: "cypress/integration",
	reporter: "mochawesome",
	video: false,
	screenshotOnRunFailure: false,
	chromeWebSecurity: false,
	reporterOptions: {
		overwrite: false,
		html: true,
		json: true
	},
	defaultCommandTimeout: 4000,
	waitForAnimations: true,
	projectId: "xq2qjw"
});