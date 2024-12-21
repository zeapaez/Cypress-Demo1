describe('Upload files', () => {
    it.skip('Upload files test - selectFile', () => {
        const FilePath = Cypress.config('fileServerFolder') + '\\cypress\\downloads\\download.xlsx'
        cy.visit('https://rahulshettyacademy.com/upload-download-test/index.html')
        cy.get('#downloadButton').click()
        cy.wait(500)
        cy.task('exceljsChangeNameFruit', { valueToChange: 'Mango', NewValue: 'Sandia', filepath: FilePath })
        cy.task('exceljsChangeNameFruit', { valueToChange: 'Papaya', NewValue: 'Melon', filepath: FilePath })
        cy.get('#fileinput').should('be.visible').selectFile(FilePath)
    });

    it('parent function test', () => {
        let priceValue
        const FilePath = Cypress.config('fileServerFolder') + '\\cypress\\downloads\\download.xlsx'
        cy.visit('https://rahulshettyacademy.com/upload-download-test/index.html')
        cy.contains('Apple').parent().parent().find('#cell-4-undefined div').should('be.visible').then(($ele)=>{  //Here it filter by some value in the row
            priceValue = $ele.text().trim()          
            expect($ele.text().trim()).to.equal('345') 
        })

        cy.contains('Apple').parent().parent().find('#cell-4-undefined div').should('have.text','345')
        //cy.contains('Apple').parent().parent().find('#cell-4-undefined div').should('be.visible').and('have.text',priceValue)      
    });  
});