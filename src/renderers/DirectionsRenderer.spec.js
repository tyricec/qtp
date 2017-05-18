import DirectionsRenderer from './DirectionsRenderer'

test('DirectionsRenderer renders directions where specified', () => {
  const directions = [{
    instructions: 'Turn Left',
  }, {
    instructions: 'Turn Right',
  }, {
    instructions: 'Head straight and destination is to the left',
  },]

  const element = document.createElement('div')

  const directionsRenderer = new DirectionsRenderer(element, directions)

  directionsRenderer.render()

  expect(element.outerHTML).toMatchSnapshot()
})