const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://latvija.gov.lv',
    viewportWidth: 1366,
    viewportHeight: 850,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    video: false,
    experimentalMemoryManagement: true,
    setupNodeEvents(on, config) {
      // placeholder for tasks (security checks, etc.)
      return config;
    },
  },
});


