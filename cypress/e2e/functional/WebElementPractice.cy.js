describe('Web Elements Practice',()=>{
    it('Select Dropdown',()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //Radiobuttons
        cy.get('#radio-btn-example input').check('radio1')
        cy.get('#radio-btn-example input').check('radio2')
        cy.get('#radio-btn-example input').check('radio3')

        //Prediction Suggestion Field
        cy.get('input#autocomplete').type('Ind')
        cy.get('#ui-id-1').should('be.visible').find('.ui-menu-item').each(($el, index, $list) => {
            const textValue = $el.find('div.ui-menu-item-wrapper').text()
            cy.log(textValue)
            if (textValue == 'India') {
                cy.log('Escogiste India')
                cy.wrap($el).find('div.ui-menu-item-wrapper').click()
            }
        })

        //Select dropdown
        cy.get('#dropdown-class-example').select('option1').should('have.value', 'option1')
        cy.get('#dropdown-class-example').select('option2').should('have.value', 'option2')
        cy.get('select').select('Option3').should('have.value', 'option3')
        cy.get('select#dropdown-class-example option[value=option1]').should('have.text', 'Option1') //only validation

        //Checkbox
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
        cy.get('#checkBoxOption2').check().should('be.checked')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type=checkbox]').check(['option1', 'option3']).should('be.checked')

        //Alerts popup
        cy.get('#name').should('be.visible').type('Antonio')
        // Alert - Button OK
        cy.get('#alertbtn').should('be.visible').click()
        cy.on('window:alert', (str)=>{
            expect(str).to.equal('Hello Antonio, share this practice page and share your knowledge')
        })

        // Confirm - Buttons OK and Cancel
        cy.get('#name').should('be.visible').type('Antonio')
        cy.get('#confirmbtn').should('be.visible').click()
        cy.on('window:confirm', (str)=>{
            expect(str).to.equal('Hello Antonio, Are you sure you want to confirm?')
        })        
        
        //Invisible Elements
        cy.get('#hide-textbox').should('be.visible')
        cy.get('#show-textbox').should('be.visible')
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

        cy.get('#displayed-text').then(($el) => {
            cy.log(Cypress.dom.isVisible($el)) // true
        })
    }) 
})