import loginPracticePage from '../../support/page_objects/loginPracticePage';
import homePracticePage from '../../support/page_objects/homePracticePage'
import CartPage from '../../support/page_objects/cartPracticePage';
import PurchasePage from '../../support/page_objects/purchasePracticePage';

describe('Test with POM', () => {
    let data
    before(()=> {
        cy.fixture('dataE2EPage').then((cdata)=> {
            data=cdata;
          })
    })

    it('E2E with POM',  {defaultCommandTimeout: 10000 }, () => {
        //Login - Library
        loginPracticePage.visit('https://rahulshettyacademy.com/loginpagePractise/')
        loginPracticePage.login(data.username,data.password)

        //Home Page - Library
        homePracticePage.verifyNameOfTheHomePage('Shop Name')
        homePracticePage.verifyTheItemsCardsNumberIsCorrect(4)
        homePracticePage.addTheItemsToTheCartFromList(data.expectedList) 
        homePracticePage.clickCheckoutButton()

        //Cart Page - Class
        const cartPracticePage = new CartPage()
        cartPracticePage.verifyTheCartItemsNumberIsCorrect(2)
        cartPracticePage.checkTheSumOfThePricesDoesNotExceedTheExpectedAmount(200000)
        cartPracticePage.clickCheckoutButton()
    
        //Proceed with the checkout - Class
        const purchasePracticePage = new PurchasePage()
        purchasePracticePage.verifyLocationFieldIsVisible()
        purchasePracticePage.typeTheFollowingValueToTheLocationField('Ind')
        purchasePracticePage.selectTheCountryFromTheSuggestedValues(data.indiaCountry)
        purchasePracticePage.selectTheAgreementCheckbox()
        purchasePracticePage.clickOnPurchaseButton()
        purchasePracticePage.verifyTheAlertContainsTheFollowingText('Thank you! Your order will be delivered in next few weeks :-).')
    })   
        
});