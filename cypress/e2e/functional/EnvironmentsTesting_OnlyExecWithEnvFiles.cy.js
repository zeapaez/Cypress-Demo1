describe('Execution by Environments', () => {
    // This Test cases only runs with enviroments config
    it('Execution  environmets', () => {
        cy.visit('')
        cy.log(cy.url())
        cy.log('Username: ' + Cypress.env('username'))
    });
});