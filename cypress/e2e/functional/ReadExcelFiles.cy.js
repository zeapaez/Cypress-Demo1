const ExcelJS = require('exceljs');
describe('Excel Files reading testing', () => {
    it('Read Excel Files', () => {
        let country = 'India'
        let itemName, invoiceNum;
        let price
        cy.loginAndStoreToken();
        cy.visit('https://rahulshettyacademy.com/client')
        cy.get('section#products').should('be.visible')

        cy.get('section#products div.card h5').eq(1).then((ele) => {
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
        cy.get('label.ng-star-inserted').should('be.visible').then((ele) => {
            const value = (ele.text().split(' |')[1].trim())
            cy.log(value)
            invoiceNum = value
        })

        cy.get('.ng-trigger').should('not.exist')
        cy.get('.order-summary button').contains('Excel').should('be.enabled').focus().click()
        cy.wait(500)
        cy.get('div.title').contains('$').then((ele) => {
            price = ele.text().split('$ ')[1].trim()
            cy.log('The total price is: ' + parseInt(price))
        })

        const pathFileName = Cypress.config('fileServerFolder') + '/cypress/downloads/order-invoice_zeapaez.xlsx'
        cy.task('excelToJsonConverter', pathFileName).then((result) => {
            console.log(result)
            cy.log('Invoice Number: ' + result.data[1].A)
            cy.log('Product Name": ' + result.data[1].B)
            cy.log('Product Price: ' + result.data[1].D)
            cy.log('Email : ' + result.data[1].F)
            expect(result.data[1].B).to.equal('ADIDAS ORIGINAL')
            expect(result.data[1].D).to.equal(price)
        })

        //Optional, only check the content in general view
        // cy.readFile(pathFileName).then((content)=>{
        //     expect(content).to.include(itemName)
        // })
    });

    it('Read Excel File 2 - With exceljs', () => {
        let country = 'India'
        let itemName, invoiceNum;
        let price
        cy.loginAndStoreToken();
        cy.visit('https://rahulshettyacademy.com/client')
        cy.get('section#products').should('be.visible')

        cy.get('section#products div.card h5').eq(1).then((ele) => {
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
        cy.get('label.ng-star-inserted').should('be.visible').then((ele) => {
            const value = (ele.text().split(' |')[1].trim())
            cy.log(value)
            invoiceNum = value
        })

        cy.get('.ng-trigger').should('not.exist')
        cy.get('.order-summary button').contains('Excel').should('be.enabled').focus().click()
        cy.wait(500)
        cy.get('div.title').contains('$').then((ele) => {
            price = ele.text().split('$ ')[1].trim()
            cy.log('The total price is: ' + parseInt(price))
        })

        const pathFileName = Cypress.config('fileServerFolder') + '\\cypress\\downloads\\order-invoice_zeapaez.xlsx' 
        //task read
        //task write

        cy.task('exceljsChangeCountry', pathFileName)
    });
});