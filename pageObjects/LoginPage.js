import BasePage from './BasePage'

export default class LoginPage extends BasePage {

    constructor() {
        super()
    }

    loginLink = '#pt-login'
    loginTextField = '#wpName1'
    passwordTextField = '#wpPassword1'
    loginButton = '#wpLoginAttempt'

    visitLoginPage() {
        this.navigate('')
        cy.get(this.loginLink).click()
    }

    loginUser(username, password) {
        this.visitLoginPage()
        cy.get(this.loginTextField).type(username)
        cy.get(this.passwordTextField).type(password)
        cy.get(this.loginButton).click()
        this.getUrl().should('eq', this.baseUrl + 'Main_Page');
    }
}