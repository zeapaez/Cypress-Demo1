# Cypress-Demo1
Cypress-Demo1 (Cypress - Javascript)

STEPS 

1.	Clone the repository
2.	Open Visual Studio Code and open the project folder
3.	Open the VSC terminal
4.	After downloading/cloning the repository run: 'npm install' to download all components/plugins
5.	Execute: npm run cy:open
6.	To open Cypress console dashboard: npm run cy:open
7.	To run the TC's: npx cypress run
  The report will be in cypress/reports/index.HTML
8. To run the cucumber TC's: npx cypress run --spec cypress/e2e/BDD/StorePage.feature --config-file cypress/config/cypress.cucumber.config.js
-To create the result After the execution of the cucumber tests: node cucumber-html-report.js
9. To run by environments:
  dev: npx cypress open --config-file cypress/config/cypress.dev.config.js
  qa: npx cypress open --config-file cypress/config/cypress.qa.config.js
  uat: npx cypress open --config-file cypress/config/cypress.uat.config.js
  prod: npx cypress open --config-file cypress/config/cypress.prod.config.js

## Programming Languages:
- Javascript 
- Cypress
