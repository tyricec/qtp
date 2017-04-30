const autocomplete = require('./autocomplete')

test('autocomplete creates autocomplete element', () => {
  let input = document.createElement('input')

  autocomplete.attach(input)

  expect(document.body.querySelector('.qtp-autocomplete')).not.toBeNull()
})

test('autocomplete generates autocomplete list', () => {
  let input = document.createElement('input')

  autocomplete.attach(input)

  expect(document.body.querySelector('.qtp-autocomplete__list')).not.toBeNull()
})