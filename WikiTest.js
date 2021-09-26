const $homepageUrl = 'https://en.wikipedia.org/'
const $articleUrl = 'https://en.wikipedia.org/wiki/'
const $loggedInUrl = 'https://en.wikipedia.org/wiki/Main_Page'

let $loginTextField = '[id=wpName1]'
let $passwordTextField = '[id=wpPassword1]'
let $loginButton = '[id=wpLoginAttempt]'

let $loginLink = '[id=pt-login]'
let $watchlistLink = '[id=pt-watchlist]'
let $watchlistItemHref = '[href="/wiki/'

let editWatchlistButton = '.mw-rcfilters-ui-watchlistTopSectionWidget-editWatchlistButton > .oo-ui-widget > .oo-ui-buttonElement-button'
let removeFromWatchlistButton = '.oo-ui-inputWidget-input > .oo-ui-labelElement-label'

let $watchlistAddButton = '[id=ca-watch]'

let $page1 = 'NASA'
let $page2 = 'Earth'

function login(username, password) {
    cy.visit($homepageUrl)
    cy.get($loginLink).click()
    cy.get($loginTextField).type(username)
    cy.get($passwordTextField).type(password)
    cy.get($loginButton).click()
    cy.url().should('eq', $loggedInUrl);
}

function addPageToWatchlist(pageName) {
    let url = $articleUrl + pageName
    cy.visit(url)
    cy.get($watchlistAddButton).click()
}

function editWatchlist() {
    cy.get($watchlistLink).click()
    cy.get(editWatchlistButton).click()
}

function removePageFromWatchlist(pageName) {
    editWatchlist()
    cy.get('input[type="checkbox"]').check(pageName)
    cy.get(removeFromWatchlistButton).click()
}

function checkPageOnWatchlist(pageName) {
    editWatchlist()
    let itemLocator = $watchlistItemHref + pageName + '"]'
    cy.get(itemLocator).should('exist')
}

function verifyPageTitle(pageName) {
    let itemLocator = $watchlistItemHref + pageName + '"]'
    cy.get(itemLocator).click()
    cy.get('h1').should('have.text', pageName)
}

describe('Test Wiki watchlist', () => {
    it('1. Add two pages to your watchlist', () => {
        login('Wiki_test111', 'good_pass')
        addPageToWatchlist($page1)
        addPageToWatchlist($page2)
    })
    it('2. Removes one of the articles from your watchlist', () => {
        removePageFromWatchlist($page1)
    })

    it('3. Makes sure that the second article is still present in the watchlist', () => {
        checkPageOnWatchlist($page2)
    })

    it('4. Goes to the article in the watchlist and makes sure that the title matches', () => {
        verifyPageTitle($page2)
    })

    after(() => {
        removePageFromWatchlist($page2)
    })
})
