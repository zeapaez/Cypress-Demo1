class HomePage2 {
    // Locators
    pageName = '.navbar.navbar-expand-sm.bg-dark.navbar-dark a.navbar-brand';
    appCards = 'app-card';
    checkoutButton= 'a.nav-link.btn.btn-primary';

    //Functions
    verifyNameOfTheHomePage(shopName){
        cy.get(this.pageName).should('be.visible')
        cy.contains(shopName).should('be.visible')
    }

    verifyTheItemsCardsNumberIsCorrect(numberCards){
        cy.get(this.appCards).should('have.length',numberCards)
    }

    addTheItemsToTheCartFromList(expectedList){
        expectedList.forEach(element =>{
            cy.get(this.appCards).should('be.visible').filter(`:contains("${element}")`).find('button').click()
        })       
    }

    addAnItemToTheCart(nameDevice){
        cy.get(this.appCards).should('be.visible').filter(`:contains("${nameDevice}")`).find('button').click()  
    }

    clickCheckoutButton(){
        cy.get(this.checkoutButton).should('be.visible').click()
    }
}
export default HomePage2;