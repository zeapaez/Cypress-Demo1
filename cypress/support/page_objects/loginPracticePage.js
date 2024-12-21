class LoginPage {
    // Locators (como variables dentro de la clase)
    userNameFiled = '#username';
    passwordField = '#password';
    loginButton = '#signInBtn';  // El selector para el botón de login
    welcomeMessage = 'h1#welcome'; // El selector para el mensaje de bienvenida
  
    // Métodos para interactuar con los elementos
    login(username, password) {
        cy.loginPracticePage(username,password); // You can comment this line and uncomment the next 3 lines.
        // cy.get(this.userNameFiled).should('be.visible').type(username)
        // cy.get(this.passwordField).should('be.visible').type(password)
        // cy.get(this.loginButton).should('be.visible').click()
    }
    
    visit(url){
        cy.visit(url)
    }
  }
  export default new LoginPage();