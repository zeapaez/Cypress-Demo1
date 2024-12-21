describe('Mouse Events',()=>{
    it('Mouse Over',()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#mousehover').should('be.visible').scrollIntoView()
        cy.get('.mouse-hover-content').invoke('show')
        cy.get('.mouse-hover-content').should('be.visible')
        cy.contains('Top').click()
    })
})