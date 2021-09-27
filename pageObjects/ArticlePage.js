import BasePage from './BasePage'

export default class ArticlePage extends BasePage {

    constructor() {
        super()
    }

    watchlistAddButton = '[id=ca-watch]'

    visitArticlePage(pageName) {
        this.navigate(pageName)
    }

    addToWatchlist(pageName) {
        this.visitArticlePage(pageName)
        cy.get(this.watchlistAddButton).click()
    }

    getTitle(pageName) {
        return cy.get('h1')
    }
}