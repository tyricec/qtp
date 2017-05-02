module.exports = {
  'Home': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .getTitle(function(title) {
        browser.assert.equal(title, 'QTP (Quick Trip Planner)')
      })
      .end()
  },
}