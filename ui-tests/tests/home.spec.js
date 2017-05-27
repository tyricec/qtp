module.exports = {
  'Home': function(browser) {
    browser
      .url('https://tyricec.github.io/qtp/')
      .waitForElementVisible('body', 1000)
      .getTitle(function(title) {
        browser.assert.equal(title, 'QTP (Quick Trip Planner)')
      })
      .end()
  },
}