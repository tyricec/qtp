module.exports = {
  'Autocomplete pops up': function (browser) {
    var autocomplete = browser.page.autocomplete()

    browser.url('https://tyricec.github.io/qtp/')
    autocomplete.click('@startPoint')
    autocomplete.setValue('@startPoint', '12041 Brixton')
    autocomplete.expect.element('.qtp-autocomplete').to.be.present.before(4000)
  },
}