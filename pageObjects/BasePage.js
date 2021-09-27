export default class BasePage {
    baseUrl = 'https://en.wikipedia.org/wiki/';

    navigate(path) {
        cy.visit(this.baseUrl + path);
    }

    getUrl() {
        return cy.url()
    }
}