describe('Request testing', () => {
    it('POST request testinf', () => {
        //cy.request(method, url, body)
        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {
            "name": "Learn Cypress Automation wiht JavaScript",
            "isbn": "MXZeas",
            "aisle": "22s8",
            "author": "Juan Perez"
        }).then(function (response) {
            expect(response.body).to.have.property("Msg", "successfully added")
            expect(response.status).to.eq(200)
        })
    })
});