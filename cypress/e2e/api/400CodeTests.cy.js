describe('400 code responses Testing', () => {
    it('Code 404 Testing', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        //Api intercept function
        cy.intercept("GET", "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty", (req) =>
         {
            req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra'
            req.continue((res) => {  
                //cy.log(res.statusCode)         
                //expect.apply(res.statusCode).to.equal(200)
            })
        }).as('notFound')
        cy.get('.btn.btn-primary').should('be.visible').click()
        cy.wait('@notFound')
    });
});