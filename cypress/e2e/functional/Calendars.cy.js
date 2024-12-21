describe('Calendar Handle', ()=>{
    it('Calendar using type',()=>{
        const dateMonth= "6";
        const dateDay = "22";
        const dateYear = "2028";
        const expectedList = [dateMonth,dateDay,dateYear]

        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers')
        cy.get('.react-date-picker__inputGroup').click()
        cy.get('input[name=month]').type(dateMonth)
        cy.get('input[name=day]').type(dateDay)
        cy.get('input[name=year]').type(dateYear)
        cy.get('.react-calendar__viewContainer').contains(dateDay).click()

        //Asertions
        cy.get('input[name=date]').should('have.attr', 'value', '2028-06-22')
        cy.get('input.react-date-picker__inputGroup__input').each(($el, index)=>{
            cy.wrap($el).invoke('val').should('eq',expectedList[index]);
        })
    })
})