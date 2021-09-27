import LoginPage from "../pageObjects/LoginPage";
import ArticlePage from "../pageObjects/ArticlePage";
import WatchlistPage from "../pageObjects/WatchlistPage";

describe('Tests Wiki watchlist', () => {

    let username = 'Wiki_test111'
    let password = 'good_pass'
    let page1 = 'Earth'
    let page2 = 'Moon'

    it('1. Add two pages to your watchlist', () => {
        const loginPage = new LoginPage()
        const articlePage = new ArticlePage()

        loginPage.loginUser(username, password)
        articlePage.addToWatchlist(page1)
        articlePage.addToWatchlist(page2)
    })

    it('2. Removes one of the articles from your watchlist', () => {

        const watchlistPage = new WatchlistPage()
        watchlistPage.removePageFromWatchlist(page1)
    })

    it('3. Makes sure that the second article is still present in the watchlist', () => {

        const watchlistPage = new WatchlistPage()
        watchlistPage.checkPageOnWatchlist(page2)
    })

    it('4. Goes to the article in the watchlist and makes sure that the title matches', () => {

        const watchlistPage = new WatchlistPage()
        const articlePage = new ArticlePage()
        watchlistPage.navigateToWatchlistItem(page2)
        articlePage.visitArticlePage(page2)
        articlePage.getTitle(page2).should('have.text', page2)
    })

    after(() => {
        const watchlistPage = new WatchlistPage()
        watchlistPage.removePageFromWatchlist(page2)
    })
})