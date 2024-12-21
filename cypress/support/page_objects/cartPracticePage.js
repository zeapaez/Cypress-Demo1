class CartPage {
    //Locators
    itemCards = 'table tbody tr div.media';
    totalPrices = 'table tbody tr td:nth-child(4) strong';
    checkoutButton = 'button.btn.btn-success';

    //Functions
    verifyTheCartItemsNumberIsCorrect(numberCards){
        cy.get(this.itemCards).should('have.length',numberCards)
    }   

    checkTheSumOfThePricesDoesNotExceedTheExpectedAmount(amount){
        let sum = 0
        cy.get(this.totalPrices).each($el=>{
            const value = Number($el.text().split(' ')[1].trim())    
            cy.log(value)
            sum = sum + value
            cy.log('The total price is: ' + parseInt(sum))
        }).then(()=>{
            expect(sum).to.be.lessThan(amount)
        })        
    }

    verifyTheCartItemsNumberIsCorrect(numberCards){
        cy.get(this.itemCards).should('have.length',numberCards)
    }   

    sumPricesOfItems(){
        cy.log('sumPricesOfItems function')
        let sum = 0
        return cy.get(this.totalPrices).each($el=>{
            const value = Number($el.text().split(' ')[1].trim())    
            sum = sum + value
        }).then(()=>{       
            return sum
        })        
    }

    clickCheckoutButton(){
        cy.get(this.checkoutButton).should('be.visible').click()
    }
}
export default CartPage;