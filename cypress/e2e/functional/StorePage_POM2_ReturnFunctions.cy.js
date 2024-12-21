import LoginPage2 from "../../support/page_objects/loginPracticePage2";
import CartPage from "../../support/page_objects/cartPracticePage";
import PurchasePage from "../../support/page_objects/purchasePracticePage";

describe('Page Object Model 2nd Method',function()  {
    beforeEach(()=> {
        cy.fixture('dataE2EPage').then(function(cdata) {
            this.data=cdata;
            this.loginPage = new LoginPage2()
            this.cartPracticePage = new CartPage()
          })
    })

    it('Test with POM 2nd Method - Nokia and Samsung', {defaultCommandTimeout: 10000 } ,function(){
        this.loginPage.visit('https://rahulshettyacademy.com/loginpagePractise/')
        //Optional Validation
        this.loginPage.sumar(2,3).then(function($result){
            cy.log(String($result))
            expect($result).to.equal(5)
        })
        const homePage = this.loginPage.login(this.data.username,this.data.password)

        homePage.verifyNameOfTheHomePage('Shop Name')
        homePage.verifyTheItemsCardsNumberIsCorrect(4)
        homePage.addTheItemsToTheCartFromList(this.data.expectedList) 
        homePage.clickCheckoutButton()

        //Cart Page - Class      
        this.cartPracticePage.sumPricesOfItems().then(function(sum){
            cy.log('sumPricesOfItems return ' + sum)
            expect(sum).to.be.lessThan(200000)
        })
        this.cartPracticePage.verifyTheCartItemsNumberIsCorrect(2)
        this.cartPracticePage.checkTheSumOfThePricesDoesNotExceedTheExpectedAmount(200000)
        this.cartPracticePage.clickCheckoutButton()
    
        //Proceed with the checkout - Class
        const purchasePracticePage = new PurchasePage()
        purchasePracticePage.verifyLocationFieldIsVisible()
        purchasePracticePage.typeTheFollowingValueToTheLocationField('Ind')
        purchasePracticePage.selectTheCountryFromTheSuggestedValues(this.data.indiaCountry)
        purchasePracticePage.selectTheAgreementCheckbox()
        purchasePracticePage.clickOnPurchaseButton()
        purchasePracticePage.verifyTheAlertContainsTheFollowingText('Thank you! Your order will be delivered in next few weeks :-).')
    });

    it('Test with POM 2nd Method - iphone and Blackberry', {defaultCommandTimeout: 10000 } ,function(){
        this.loginPage.visit('https://rahulshettyacademy.com/loginpagePractise/')
        this.loginPage.sumar(2,3).then(function($result){
            cy.log(String($result))
            expect($result).to.equal(5)
        })
        const homePage = this.loginPage.login(this.data.username,this.data.password)

        homePage.verifyNameOfTheHomePage('Shop Name')
        homePage.verifyTheItemsCardsNumberIsCorrect(4)
        homePage.addTheItemsToTheCartFromList(this.data.expectedList2) 
        homePage.clickCheckoutButton()

        //Cart Page - Class      
        this.cartPracticePage.sumPricesOfItems().then(function(sum){
            cy.log('sumPricesOfItems return ' + sum)
            expect(sum).to.be.lessThan(200000)
        })
        this.cartPracticePage.verifyTheCartItemsNumberIsCorrect(2)
        this.cartPracticePage.checkTheSumOfThePricesDoesNotExceedTheExpectedAmount(200000)
        this.cartPracticePage.clickCheckoutButton()
    
        //Proceed with the checkout - Class
        const purchasePracticePage = new PurchasePage()
        purchasePracticePage.verifyLocationFieldIsVisible()
        purchasePracticePage.typeTheFollowingValueToTheLocationField('Ind')
        purchasePracticePage.selectTheCountryFromTheSuggestedValues(this.data.indiaCountry)
        purchasePracticePage.selectTheAgreementCheckbox()
        purchasePracticePage.clickOnPurchaseButton()
        purchasePracticePage.verifyTheAlertContainsTheFollowingText('Thank you! Your order will be delivered in next few weeks :-).')
    });
});