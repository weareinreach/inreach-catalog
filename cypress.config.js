const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    integrationFolder: "cypress/integration",
	reporter: "mochawesome",
	video:false,
	screenshotOnRunFailure:false,
	chromeWebSecurity: false,
	reporterOptions: {
		overwrite: false,
		html: true,
		json: true
	},
	retries: {
		runMode : 2,
		openMode : 1
	},
    defaultCommandTimeout:4000,
    waitForAnimations:true,
	projectId:"xq2qjw"
  }
});