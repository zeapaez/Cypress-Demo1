const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  projectId: 'pizyet',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    videoOnFailOnly: false  // Set to true if you want to see the video in the report, the 'video' flag must be TRUE 
  },
  "_bing Page": "Este ejemplo es la pagina de bing",

  env: {
    something: "QA",
    username: "qaUser",
    password: "qaPass",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: "https://www.bing.com/"
  },
});
