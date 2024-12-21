const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./cypress/reports/cucumberReports",
  reportPath: "cypress/reports/cucumberReports/htmlReport",
  reportName: "Cypress Cucumber Report",
  metadata: {
    browser: {
      name: "chrome",
      version: "131.0.6778.109",
    },
    device: "MSI",
    platform: {
      name: "Windows 11",
      version: "26100.2605",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Cypress Automation" },
      { label: "Release", value: "Demo 0" },
      { label: "Cycle", value: "Demo" }
      // { label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
      // { label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
    ],
  },
});