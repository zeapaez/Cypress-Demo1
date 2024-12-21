/// Install this library:npm install -D cypress-iframe
import 'cypress-iframe'

describe('Frames Testing',()=>{
    it('Frame validation',()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.frameLoaded('#courses-iframe')
        cy.iframe().find('div.header-upper a[href*=mentorship]').as('mentorShip').click()
       //cy.iframe().find('div.container-fluid div.pricing-container').should('have.length',2)
    })
})