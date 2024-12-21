describe('API Testing', () => {
    it('My first API with intercept command', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        
        //Api intercept function
        cy.intercept("GET","https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
        {
            statusCode: 200,
            body: [
                {
                    "book_name": "This is a demo information",
                    "isbn": "LSA",
                    "aisle": "2303"
                }             
            ]
        }) .as('getbooks')

        cy.get('.btn.btn-primary').should('be.visible').click()
        cy.wait('@getbooks')
        cy.get('p').should('have.text','Oops only 1 Book available')
    });

    it('My first API with body with 1 record', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        
        //Api intercept function
        cy.intercept({
            method: 'GET',
            url: '/Library/GetBook.php?AuthorName=shetty'
        },
        {
            statusCode: 200,
            body: [
                {
                    "book_name": "This is a demo 1, is mocked info",
                    "isbn": "LSA",
                    "aisle": "2303"
                }             
            ]
        }) .as('getbooks')

        cy.get('.btn.btn-primary').should('be.visible').click()
        
        cy.wait('@getbooks').then(({request,response})=>{
            cy.get('tbody tr').should('have.length',1)
            cy.get('tbody tr').should('have.length',response.body.length)
        })

        cy.get('p').should('have.text','Oops only 1 Book available')
    });

    it('My first API with body 3 records', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        
        //Api intercept function
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
        {
            statusCode: 200,
            body: [
                {
                    "book_name": "This is a demo 1, is mocked info",
                    "isbn": "LSA",
                    "aisle": "2303"
                },
                {
                    "book_name": "RestAssured with Java -  mocked data",
                    "isbn": "DSR",
                    "aisle": "2304"
                },
                {
                    "book_name": "Selenim with C# - The Bible",
                    "isbn": "SCT",
                    "aisle": "2305"
                }                             
            ]
        }) .as('getbooks')

        cy.get('.btn.btn-primary').should('be.visible').click()
        cy.wait('@getbooks').then(({request,response})=>{
            cy.get('tbody tr').should('have.length',3)
            cy.get('tbody tr').should('have.length',response.body.length)
        })        
    });

    it('My first API with fixture', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        
        //Api intercept function
        cy.intercept({
            method: 'GET',
            url: '/Library/GetBook.php?AuthorName=shetty'
        },
        {
            statusCode: 200,
            fixture: '/responses/GetBook.json'
        }) .as('getbooks')

        cy.get('.btn.btn-primary').should('be.visible').click()
        cy.wait('@getbooks').then(({request,response})=>{
            cy.get('tbody tr').should('have.length',10)
            cy.get('tbody tr').should('have.length',response.body.length)
        })        
    });
});