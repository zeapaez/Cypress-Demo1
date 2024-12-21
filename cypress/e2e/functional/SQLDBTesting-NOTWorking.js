/// <reference types="cypress" />

context('SQL Database testing', () => {
    it('Query to SQL', () => {
        cy.sqlServer("select * from people").then(function(result){
            console.log(result[0][1])
        })
    });
});