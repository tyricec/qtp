module.exports = {
  'Autocomplete pops up': function (browser) {
    var autocomplete = browser.page.autocomplete()

    browser.url(browser.launchUrl + ':8080')
    autocomplete.click('@startPoint')
    autocomplete.setValue('@startPoint', '12041 Brixton')
    autocomplete.expect.element('@autocomplete').to.be.present.before(4000)
  },
}