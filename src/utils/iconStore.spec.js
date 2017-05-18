import iconStore from './iconStore'

test('iconStore returns icon element', () => {
  const result = iconStore.getIconElement('turn-left')

  expect(result.outerHTML).toMatchSnapshot()
})