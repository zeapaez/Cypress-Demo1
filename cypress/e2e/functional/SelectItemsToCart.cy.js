describe('GreenKart portal', () => {
    beforeEach(() => {
        // cy.intercept('GET', '*/products.json/*').as('products')
    })

    it('Go to the page and Select Items to the Cart', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        //cy.wait("@products") // waiting upon the signup alias

        cy.get('.brand.greenLogo').should('be.visible')
        cy.get('div.products.products').should('be.visible')
        cy.get('input.search-keyword').should('be.visible')  //Otra opcion es: input[type='search']

        cy.get('input[type=search]').type('ca')
        cy.get('.product:visible').should('have.length', 4)
        cy.get('div.products div.product').should('have.length', 4)

        // ** Alias **
        cy.get('div.products').as("productsElement") 
  
        cy.get('@productsElement').find('.product').should('have.length', 4)
        cy.get('@productsElement').find('.product').eq(2).contains('ADD TO CART').click().then(()=>{
            console.log("Click on Add to cart")
        })
        cy.get('@productsElement').find('.product').each(($el, index, $list) => {
            const textValue = $el.find('h4.product-name').text()
            cy.log(textValue)
            if (textValue.includes('Cashews')) {
                cy.log('Escogiste Cashews')
                cy.wrap($el).find('button').click()
            }
        })
        
        cy.get('input[type=search]').clear()
        cy.get('input[type=search]').type('Brocolli')
        cy.get('@productsElement').find('div button').should('have.length', 1)
        cy.get('div.product button').click()

        //Invalid syntax Example  - To get a text
        //const logo = cy.get('.brand')
        //cy.log(logo.text())   // Never work like this, you need use promise, with then()

        //Valid syntax Example - To get a text
        cy.get('.brand.greenLogo').then((logoElement) => {
            cy.log(logoElement.text())
        })

        cy.get('.cart-icon > img').as("cartIcon") //Cart Ico
        cy.get('@cartIcon').should('be.visible')
        cy.get('@cartIcon').click()

        cy.get('.cart-preview.active button').should('be.visible') //Proceed to checkout
        cy.get('.cart-preview.active button').click()

        cy.get('.products table').should('be.visible')
       

        cy.get('.container').find('.products-wrapper').each(($el, index, $list) => {
            // const textValue = $el.find('button').text()
            // cy.log(textValue)
            if($el.find('button').text().includes('Place Order')){
            //if (textValue.includes('Place Order')) {
                cy.log('Escogiste Place Order')
                $el.find('button').click()
            }
        })

        // cy.contains('Place Order').click()

    })

    it('Go to the page and Select Items and Checkout', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.brand.greenLogo').should('be.visible')
        cy.get('div.products.products').should('be.visible')
        cy.get('input.search-keyword').should('be.visible')  //Otra opcion es: input[type='search']

        cy.get('input[type=search]').type('ca')
        cy.get('div.products div.product').should('have.length', 4)

        // ** Alias **
        cy.get('div.products').as("productsElement") 
        cy.get('@productsElement').find('.product').eq(2).contains('ADD TO CART').click().then(()=>{
            console.log("Click on Add to cart")
        })
        cy.get('@productsElement').find('.product').each(($el, index, $list) => {
            const textValue = $el.find('h4.product-name').text()
            cy.log(textValue)
            if (textValue.includes('Cashews')) {
                cy.log('Escogiste Cashews')
                cy.wrap($el).find('button').click()
            }
        })
        
        cy.get('input[type=search]').clear()
        cy.get('input[type=search]').type('Brocolli')
        cy.get('@productsElement').find('div button').should('have.length', 1)
        cy.get('div.product button').click()
         //Valid syntax Example - To get a text
        cy.get('.brand.greenLogo').then((logoElement) => {
            cy.log(logoElement.text())
        })

        cy.get('.cart-icon > img').as("cartIcon") //Cart Icon
        cy.get('@cartIcon').should('be.visible')
        cy.get('@cartIcon').click()

        cy.get('.cart-preview.active button').should('be.visible') //Proceed to checkout
        cy.get('.cart-preview.active button').click()

        cy.get('.products table').should('be.visible')
        cy.contains('Place Order').click()

    })


})