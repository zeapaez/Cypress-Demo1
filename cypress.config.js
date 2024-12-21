const { defineConfig } = require("cypress");

//#Cucumber Config - START
const browserify = require("@cypress/browserify-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");
const excelToJson = require("convert-excel-to-json");
const fs = require('fs');
const ExcelJS = require('exceljs');


async function setupNodeEvents(on, config) {

  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
  );

  require('cypress-mochawesome-reporter/plugin')(on)  // ALWAYS COMMENT this line when running tests in cucumber

  on('task', {
    excelToJsonConverter(filePath) {
      const result = excelToJson({
        source: fs.readFileSync(filePath)
      });
      return result
    }
  })

  on('task', {
    async exceljsChangeCountry(filepath) {
      let output = { row: -1, column: -1 }
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filepath)
      const worksheet = workbook.getWorksheet('data')
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

          if (cell.value == 'India' || cell.value == 'Pakistan') {  // Value to Change
            output.row = rowNumber          //2 - row
            output.column = colNumber       //5 - column
          }
        })
      })

      let cell = worksheet.getCell(output.row, output.column)
      let newValue = ''
      if (cell.value == 'India') { newValue = "Pakistan" } // If the value is India the new value will be Pakistan
      if (cell.value == 'Pakistan') { newValue = "India" } // If the value is Pakistan the new value will be India
      cell.value = newValue
      //await workbook.xlsx.writeFile(filepath) // Write/Set the new value    
      return workbook.xlsx.writeFile(filepath).then(() => {
        return true
      })
        .catch((error) => {
          return false
        })
    }
  })

  on('task', {
    async exceljsChangeNameFruit({ valueToChange, NewValue, filepath }) {
      let output = { row: -1, column: -1 }
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filepath)
      const worksheet = workbook.getWorksheet('Sheet1')

      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

          if (cell.value == valueToChange) {  // Value to Change
            output.row = rowNumber          //2 - row
            output.column = colNumber       //5 - column
          }
        })
      })

      let cell = worksheet.getCell(output.row, output.column)
      cell.value = NewValue
      //await workbook.xlsx.writeFile(filepath) // Write/Set the new value    
      return workbook.xlsx.writeFile(filepath).then(() => {
        return true
      })
      .catch((error) => {
        return false
      })

    }
  })


  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}
//#Cucumber Config - END

module.exports = defineConfig({
  projectId: 'pizyet',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    videoOnFailOnly: false  // Set to true if you want to see the video in the report, the 'video' flag must be TRUE 
  },
  e2e: {
    setupNodeEvents,
    // setupNodeEvents(on, config) {
    //    require('cypress-mochawesome-reporter/plugin')(on); //If you use cucumber report, comment this setting
    // },
    baseUrl: "https://www.google.com",
    //specPattern: 'cypress/**/**/*.cy.{js,jsx,ts,tsx}'
    //specPattern: 'cypress/**/**/*.feature'
    //specPattern: ['cypress/**/**/*.feature']
    //specPattern: 'cypress/**/*.{js,jsx,ts,tsx}'  //in case we want the .js TC files to be read
    //specPattern: 'cypress/integration/**/*.{js,jsx,ts,tsx}'  //in case we want only see the tests in cypress/integration directory
    //specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'  //in case we want only see the tests in cypress/e2e directory
  },
});


