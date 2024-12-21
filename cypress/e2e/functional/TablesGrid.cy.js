describe('Handling Tables and Grid',()=>{
    it('Handle Table',()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('table[name=courses]').should('be.visible').find('tr').each(($el, index, $list) => {
            const textInstrcutor = $el.find('td:nth-child(1)').text()        //Instrcutor
            const textCourse = $el.find('td:nth-child(2)').text()       //Course
            const textPrice = $el.find('td:nth-child(3)').text()       //Price
            cy.log('Index ' + index)
            cy.log(textInstrcutor)   
            cy.log(textCourse) 
            cy.log(textPrice)         
            if (textCourse == 'WebSecurity Testing for Beginners-QA knowledge to next level') {
                cy.log('El precio del curso '+textCourse+' es $'+ textPrice)
            }
            if (textCourse.includes('Python')) {
                cy.log('El precio del curso '+textCourse+' es $'+ textPrice)
            }

            if (textPrice.includes('25')) {
                cy.log('El curso que valen $25 es: ' +textCourse)
            }
        })

        cy.get('tr td:nth-child(2)').each(($e1, index, $list) => {
 
            const text=$e1.text()
            if(text.includes("Python"))
            {
         
                cy.get("tr td:nth-child(2)").eq(index).next().then(function(price)
                {
                 const priceText=   price.text()
                 expect(priceText).to.equal('25')
                })
            }
         
        })       

    })
})