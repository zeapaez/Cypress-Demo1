



-After downloading/cloning the repository run: 'npm install' to download all components/plugins

-To open Cypress console dashboard: npm run cy:open

To run the TC's: npx cypress run
-The report will be in cypress/reports/index.HTML

-To run the cucumber TC's: npx cypress run --spec cypress/e2e/BDD/StorePage.feature --config-file cypress/config/cypress.cucumber.config.js
-To create the result After the execution of the cucumber tests: node cucumber-html-report.js

-To run by environments:
dev: npx cypress open --config-file cypress/config/cypress.dev.config.js
qa: npx cypress open --config-file cypress/config/cypress.qa.config.js
uat: npx cypress open --config-file cypress/config/cypress.uat.config.js
prod: npx cypress open --config-file cypress/config/cypress.prod.config.js


 
 
