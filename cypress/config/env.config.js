const { defineConfig } = require("cypress");

//#Cucumber Config - START
const browserify = require("@cypress/browserify-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

//#Cucumber Config - END
 
 
module.exports = defineConfig({
  defaultCommandTimeout: 6000,
 
  env: {
    url: "https://rahulshettyacademy.com",
  },
  reporter: 'cypress-mochawesome-reporter',
 
  retries: {
    runMode: 1,
 
  },
  projectId: "nodpcq",
 
 
  e2e: {
  setupNodeEvents,
    specPattern: 'cypress/integration/examples/*.js'
 
  },
});