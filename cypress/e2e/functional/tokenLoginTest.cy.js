describe('JWT Sessions', () => {
    beforeEach(() => {
        // Log in and store the session token using the custom command
        //cy.loginAndStoreToken();

    });

    it('Login with token', () => {
        cy.loginToken().then(function () {
            cy.visit('https://rahulshettyacademy.com/client', {
                onBeforeLoad: function (window) {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
        })
        cy.get('section#products').should('be.visible')
    });

    it('Login with token 2', () => {
        cy.loginAndStoreToken();
        cy.visit('https://rahulshettyacademy.com/client')
        cy.get('section#products').should('be.visible')
    });
});