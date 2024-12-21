import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage2 from "../../../support/page_objects/loginPracticePage2";
import CartPage from "../../../support/page_objects/cartPracticePage";
import PurchasePage from "../../../support/page_objects/purchasePracticePage";
const loginPage = new LoginPage2()

Before(() => {
    cy.fixture('dataE2EPage').then(function (data) {
        this.data = data;
        this.cartPracticePage = new CartPage()
        this.purchasePracticePage = new PurchasePage()
    })
})

Given('I go to the Store Login StorePage', function () {
    loginPage.visit('https://rahulshettyacademy.com/loginpagePractise/')
})

When('I login to the app', function () {
    this.homePage = loginPage.login(this.data.username, this.data.password)
})

When('I login to the app with the following credentials',function(dataTable){
    this.homePage = loginPage.login(dataTable.rawTable[1][0],dataTable.rawTable[1][1])
})

When('I should see the app homepage', function () {
    this.homePage.verifyNameOfTheHomePage('Shop Name')
    this.homePage.verifyTheItemsCardsNumberIsCorrect(4)
})

When('I add items to the cart: Nokia Edge, Samsung Note 8', function () {
    this.homePage.addTheItemsToTheCartFromList(this.data.expectedList)
    this.homePage.clickCheckoutButton()
})

When('I add the following devices to the cart', function (dataTable) {
    dataTable.hashes().forEach((element) => {
        this.homePage.addAnItemToTheCart(element.deviceName)           
    })
    this.homePage.clickCheckoutButton()   
})

When('I add items to the cart: iphone X, Blackberry', function () {
    this.homePage.addTheItemsToTheCartFromList(this.data.expectedList2)
    this.homePage.clickCheckoutButton()
})

When('I validate the total price of the items and checkout', function () {
    this.cartPracticePage.sumPricesOfItems().then(function (sum) {
        cy.log('sumPricesOfItems return ' + sum)
        expect(sum).to.be.lessThan(200000)
    })
    this.cartPracticePage.verifyTheCartItemsNumberIsCorrect(2)
    this.cartPracticePage.checkTheSumOfThePricesDoesNotExceedTheExpectedAmount(200000)
    this.cartPracticePage.clickCheckoutButton()
})

When('I choose India contry and submit', function () {
    this.purchasePracticePage.verifyLocationFieldIsVisible()
    this.purchasePracticePage.typeTheFollowingValueToTheLocationField('Ind')
    this.purchasePracticePage.selectTheCountryFromTheSuggestedValues(this.data.indiaCountry)
    this.purchasePracticePage.selectTheAgreementCheckbox()
    this.purchasePracticePage.clickOnPurchaseButton()
})

Then('I should see the Alert message that confirm the order', function () {
    this.purchasePracticePage.verifyTheAlertContainsTheFollowingText('Thank you! Your order will be delivered in next few weeks :-).')
})


