import BasePage from './BasePage'

export default class WatchlistPage extends BasePage {

    constructor() {
        super()
    }

    watchListUrl = 'Special:Watchlist'
    editWatchlistButton = '.mw-rcfilters-ui-watchlistTopSectionWidget-editWatchlistButton > .oo-ui-widget > .oo-ui-buttonElement-button'
    removeFromWatchlistButton = '.oo-ui-inputWidget-input > .oo-ui-labelElement-label'
    elementLocator

    visitWatchlistPage() {
        this.navigate(this.watchListUrl)
    }

    editWatchlist() {
        cy.get(this.editWatchlistButton).click()
    }

    removePageFromWatchlist(pageName) {
        this.visitWatchlistPage()
        this.editWatchlist()
        cy.get('input[type="checkbox"]').check(pageName)
        cy.get(this.removeFromWatchlistButton).click()
    }

    buildLocator(pageName) {
        return `[href="/wiki/${pageName}"`
    }

    checkPageOnWatchlist(pageName) {
        this.visitWatchlistPage()
        this.editWatchlist()
        this.elementLocator = this.buildLocator(pageName)
        cy.get(this.elementLocator).should('exist')
    }

    navigateToWatchlistItem(pageName) {
        this.visitWatchlistPage()
        this.editWatchlist()
        this.elementLocator = this.buildLocator(pageName)
        cy.get(this.elementLocator).click()
    }
}
