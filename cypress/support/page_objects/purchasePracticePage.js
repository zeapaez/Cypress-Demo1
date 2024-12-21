class PurchasePage{
    //Locators
    locationField = '#country';
    suggestionElement = 'div.suggestions ul';
    agreementCheckbox = 'div.checkbox label';
    purchaseButton = 'input[value=Purchase]';
    bannerSuccessAlert = 'div.alert-success';

    //Functions
    verifyLocationFieldIsVisible(){
        cy.get(this.locationField).should('be.visible')
    }

    typeTheFollowingValueToTheLocationField(value){
        cy.get(this.locationField).click().type(value)
    }

    selectTheCountryFromTheSuggestedValues(country){
        cy.get(this.suggestionElement).should('be.visible').each(($el)=>{          
            cy.log($el.find('li a').text().trim())
            if($el.find('li a').text().trim() == country)
            {
                cy.log($el.find('li a').text().trim())
                cy.wrap($el).find('li a').click()
            }
        })        
    }

    selectTheAgreementCheckbox(){
        cy.get(this.agreementCheckbox).should('be.visible').click()
    }

    clickOnPurchaseButton(){
        cy.get(this.purchaseButton).should('be.visible').click()
    }

    verifyTheAlertContainsTheFollowingText(text){
        cy.get(this.bannerSuccessAlert).should('contain', text)
    }
}
export default PurchasePage;