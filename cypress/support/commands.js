// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('loginPracticePage', (username, password) => {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#signInBtn').click()
})

Cypress.Commands.add('loginToken', () => {
  cy.request('POST', 'https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      "userEmail": "zeapaez@hotmail.com",
      "userPassword": "Rahulshettyacademy-123abc-"
    }).then((response) => {
      expect(response.status).to.eq(200)
      Cypress.env('token', response.body.token)
  })
})

Cypress.Commands.add('loginAndStoreToken', () => {
  // Send a login request to your API or authentication endpoint
  cy.request({
    method: 'POST',
    url: 'https://rahulshettyacademy.com/api/ecom/auth/login', // Replace with your API endpoint for login
    body: {
      userEmail: 'zeapaez@hotmail.com',
      userPassword: 'Rahulshettyacademy-123abc-',
    },
  }).then((response) => {
    // Store the session token in localStorage
    expect(response.status).to.eq(200)
    localStorage.setItem('token', response.body.token);
  });
});
