import DirectionsRenderer from './DirectionsRenderer'

test('DirectionsRenderer renders directions where specified', () => {
  const directions = [{
    maneuver: 'turn-left',
    instruction: 'Turn Left',
  }, {
    maneuver: 'merge-right',
    instruction: 'Merge Right',
  }, {
    maneuver: 'straight',
    instruction: 'Head straight and destination is to the left',
  },]

  const element = document.createElement('div')

  const directionsRenderer = new DirectionsRenderer(element, directions)

  directionsRenderer.render()

  expect(element.outerHTML).toMatchSnapshot()
})