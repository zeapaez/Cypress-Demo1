const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'pizyet',
  video: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    videoOnFailOnly: false  // Set to true if you want to see the video in the report, the 'video' flag must be TRUE 
  },
  "_Mercado Libre Page": "Este ejemplo es la pagina de Mercado Libre",

  env: {
    something: "production",
    username: "prodUser",
    password: "prodPass",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: "https://www.mercadolibre.com"
  },
});
