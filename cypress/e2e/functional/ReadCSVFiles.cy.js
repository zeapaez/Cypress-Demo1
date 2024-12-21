const neatCSV = require('neat-csv')

describe('Read CSV files', () => {
    it('Login with token and verify CSV file', { defaultCommandTimeout: 10000 }, async () => {
        let country = 'India'
        let itemName, invoiceNum;
        cy.loginAndStoreToken();
        cy.visit('https://rahulshettyacademy.com/client')
        cy.get('section#products').should('be.visible')

        cy.get('section#products div.card h5').eq(1).then((ele)=>{
            itemName = ele.text()
        })
        cy.get('button.btn.w-10.rounded').should('be.visible').eq(1).click()
        cy.get('button[routerlink*=cart]').should('be.visible').click()
        cy.get('div.subtotal button.btn.btn-primary').should('be.visible').click()
        cy.get('input[placeholder="Select Country"]').should('be.visible').clear().type('Ind')
        cy.get('section.ta-results.list-group.ng-star-inserted').should('be.visible')
        cy.get('section.ta-results.list-group.ng-star-inserted button').should('be.visible').each(($el) => {
            cy.log($el.find('span').text().trim())
            if ($el.find('span').text().trim() == country) {
                cy.log($el.find('span').text().trim())
                cy.wrap($el).find('span').click()
            }
        })
        cy.get('a.btnn.action__submit.ng-star-inserted').should('be.visible').click()
        cy.get('h1.hero-primary').should('be.visible').and('contain', 'Thankyou for the order.')
        cy.get('label.ng-star-inserted').should('be.visible').then((ele)=>{
            const value = (ele.text().split(' |')[1].trim()) 
            cy.log(value)
            invoiceNum = value
        })

        //cy.wait(2000)
        cy.get('.ng-trigger').should('not.exist')
        cy.get('table button').should('be.visible').and('be.enabled').each(($el) => {
            cy.log($el.text().trim())
            if ($el.text().trim() == "Click To Download Order Details in CSV") {
                cy.log('Click on ' + $el.text().trim())
                cy.wrap($el).click()
            }
        })

        //cy.get('.order-summary button').contains('CSV').should('be.enabled').click()

        cy.readFile(Cypress.config('fileServerFolder') + '/cypress/downloads/order-invoice_zeapaez.csv').then(async (text) => {
            const csv = await neatCSV(text)
            console.log(csv)
            const productName = csv[0]['Product Name']
            const orderedBy = csv[0]['Ordered By']
            const invoiceNumber = csv[0]['Invoice Number']
            cy.log(productName)
            cy.log(orderedBy)
            expect(productName).to.equal('ADIDAS ORIGINAL')
            expect(productName).to.equal(itemName)
            cy.log('invoiceNumber ' + invoiceNumber)
            cy.log('invoiceNum ' + invoiceNum)
            //expect(invoiceNumber).to.not.be.eq(invoiceNum)    
        })

    });
});