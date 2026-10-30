const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      testEmail: "admin@minishop.com",
      testPassword: "AdminSecurePassword2026!"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
