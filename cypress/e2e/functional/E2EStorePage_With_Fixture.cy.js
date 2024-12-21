describe('End to End testing - Store page', () => {
    let data
    //Here load the fixture file
    before(()=> {
        cy.fixture('dataE2EPage').then((cdata)=> {
            data=cdata;
          })
    })

    it('Login and add item NOKIA EDGE and checkout',()=> {
        const productName = data.defaultProduct
        cy.visit('https://rahulshettyacademy.com/loginpagePractise/')
        cy.get('#username').should('be.visible').type(data.username)
        cy.get('#password').should('be.visible').type(data.password)
        cy.get('#signInBtn').should('be.visible').click()
        cy.get('.navbar.navbar-expand-sm.bg-dark.navbar-dark a.navbar-brand').should('be.visible')
        cy.contains('Shop Name').should('be.visible')
        cy.get('app-card').should('have.length',4)
        //cy.get('app-card').filter(':contains("'+productName+'")').should('be.visible').and('have.length',1)
        cy.get('app-card').filter(`:contains("${productName}")`).should('be.visible').and('have.length',1)
        .then(el=>{          
            cy.log(el.find('button').text())
            cy.wrap(el).find('button').click()
        })
    })

    it('Add several item to the cart', {defaultCommandTimeout: 10000 },()=> {       
        const expectedList = ['Nokia Edge','Samsung Note 8']
        let sum = 0
        cy.visit('https://rahulshettyacademy.com/loginpagePractise/')
        cy.get('#username').should('be.visible').type(data.username)
        cy.get('#password').should('be.visible').type(data.password)
        cy.get('#signInBtn').should('be.visible').click()
        cy.get('.navbar.navbar-expand-sm.bg-dark.navbar-dark a.navbar-brand').should('be.visible')
        cy.contains('Shop Name').should('be.visible')
        cy.get('app-card').should('have.length',4)

        // Add the items to the cart
        expectedList.forEach(element =>{
            cy.get('app-card').should('be.visible').filter(`:contains("${element}")`).find('button').click()
        })    
        cy.get('a.nav-link.btn.btn-primary').should('be.visible').click()
        cy.get('table tbody tr div.media').should('have.length',2)
        //₹. 65000
        cy.get('table tbody tr td:nth-child(4) strong').each($el=>{
            const value = Number($el.text().split(' ')[1].trim())    
            cy.log(value)
            sum = sum + value
            cy.log('The total price is: ' + parseInt(sum))
        }).then(()=>{
            expect(sum).to.be.lessThan(200000)
        })

        //Proceed with the checkout
        const country = 'India' 
        cy.get('button.btn.btn-success').should('be.visible').click()
        cy.get('#country').should('be.visible').click().type('Ind')
        //cy.get('div.suggestions ul', { timeout: 20000 }).should('be.visible').each(($el)=>{      
        cy.get('div.suggestions ul').should('be.visible').each(($el)=>{          
            cy.log($el.find('li a').text().trim())
            if($el.find('li a').text().trim() == country)
            {
                cy.log($el.find('li a').text().trim())
                cy.wrap($el).find('li a').click()
            }
        })
        cy.get('div.checkbox label').should('be.visible').click()
        cy.get('input[value=Purchase]').should('be.visible').click()
        cy.get('div.alert-success').should('contain', 'Thank you! Your order will be delivered in next few weeks :-).') 
    })
})