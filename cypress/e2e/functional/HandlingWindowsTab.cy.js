describe('Handling new windows and tab in the browser',()=>{
    it('Handle new tab',()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //New Tab
        cy.get('#opentab').should('be.visible').invoke('removeAttr','target').click()

        cy.origin('https://www.qaclickacademy.com', () => {
            cy.get('li.nav-item a[href*=about]').should('be.visible')
        })  
    })

    it('Handle new tab without removing target attrribute',()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //New Tab
        cy.get('#opentab').should('be.visible').then(newTab =>{
            const hrefTab = newTab.prop('href') 
            cy.visit(hrefTab)
            // cy.get('li.nav-item a[href*=about]').should('be.visible')
        })

        cy.origin('https://www.qaclickacademy.com', () => {
            cy.get('li.nav-item a[href*=about]').should('be.visible')
        }) 
    })


    it('Handle new Window in the browser',()=>{

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //New Window
        cy.get('#opentab').should('be.visible').then((el)=>{
            const url = el.prop('href')
            cy.log(url)
        })
        
        cy.get('#openwindow').click()
        cy.window().then((win) => {
            cy.stub(win, 'open', url => {
                win.location.href = 'https://www.qaclickacademy.com';
            }).as("popup")
        })
        cy.get('#openwindow').click()
        cy.get('@popup').should("be.called")  

        cy.origin('https://www.qaclickacademy.com', () => {
            cy.get('li.nav-item a[href*=about]').should('be.visible').click()
            
        })     
    }) 

    it('Handle new Window in the browser version 2 - BEST',()=>{

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //New Window
        cy.get('#opentab').should('be.visible').then((el)=>{
            const url = el.prop('href')
            cy.log(url)      
            cy.visit(url)            
        }) 
        cy.origin('https://www.qaclickacademy.com', () => {
            cy.get('li.nav-item a[href*=about]').should('be.visible').click()
            
        })   
    })  
    
})