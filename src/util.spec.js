import util from './util'

test('buildHTML creates div element', () => {
  const result = util.buildHTML('div')

  expect(result.outerHTML).toMatchSnapshot()
})

test('buildHTML create li element', () => {
  const result = util.buildHTML('li')

  expect(result.outerHTML).toMatchSnapshot()
})

test('buildHTML adds attribues', () => {
  const result = util.buildHTML(
    'li',
    {
      class: 'list-item',
      style: 'top: 20px;color: white;left: 5px',
    }
  )

  expect(result.outerHTML).toMatchSnapshot()
})

test('buildHTML adds text', () => {
  const result = util.buildHTML(
    'div',
    {},
    document.createTextNode('Build HTML Test')
  )

  expect(result.outerHTML).toMatchSnapshot()
})

test('buildText creates text node', () => {
  const result = util.buildText(
    'Build Text Test'
  )

  expect(result.wholeText).toMatchSnapshot()
})