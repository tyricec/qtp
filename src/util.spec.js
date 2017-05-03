import util from './util'

test('createElement creates div element', () => {
  const result = util.createElement('div')

  expect(result.outerHTML).toMatchSnapshot()
})

test('createElement create li element', () => {
  const result = util.createElement('li')

  expect(result.outerHTML).toMatchSnapshot()
})