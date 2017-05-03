module.exports = {
  'Autocomplete pops up': function (browser) {
    var autocomplete = browser.page.autocomplete()

    browser
      .url(browser.launchUrl + ':8080')
      .waitForElementVisible('#qtp-start-point', 2000)
      .setValue('#qtp-start-point', '12041 Brixton')

    autocomplete.expect.element('@autocomplete').to.be.present.before(2000)
  },
}