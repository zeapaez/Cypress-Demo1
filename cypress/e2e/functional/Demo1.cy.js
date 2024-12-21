describe('Demo test template spec', () => {
  it('Demo test 1', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it
    cy.get('.action-email').type('fake@email.com')

    //  Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'fake@email.com')
  })

  it('Demo test 2', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it
    cy.get('.action-email').type('automation@email.com')

    //  Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'automation@email.com')
  })

})

describe('My First Test', function () {
  it('Does not do much!', function()  {
    expect(true).to.equal(true)
  })
})