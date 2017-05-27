module.exports = {
  'QTP Form': function(browser) {
    const form = browser.page.form()

    browser.url('https://tyricec.github.io/qtp/')
    form.setValue('@startPoint', 'San Bernardino, CA')
    form.setValue('@destinationPoint', 'Riverside, CA')
    form.click('@submitBtn')
    form.expect.element('@results').to.be.visible.before(4000)
  },
}