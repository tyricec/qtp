import googleDirectionsReducer from './googleDirectionsReducer'
import directionsResult from './__mocks__/directionsResult'

test('googleDirectionsReducer returns instructions', () => {
  const result = googleDirectionsReducer(directionsResult())

  expect(result).toEqual([{
    instructions: 'Head <b>south</b> on <b>Brixton Ct</b> toward <b>Sheffield Dr</b>',
  }, {
    instructions: 'Turn <b>left</b> onto <b>Sheffield Dr</b>',
  }, {
    instructions: 'Turn <b>left</b> onto <b>Heritage Dr</b>',
  }, {
    instructions: 'Turn <b>right</b> onto <b>Ironwood Ave</b>',
  }, {
    instructions: 'Turn <b>left</b> onto <b>Heacock St</b>',
  }, {
    instructions: 'Turn <b>left</b> onto <b>Parkland Ave</b>',
  }, {
    instructions: 'Turn <b>right</b> onto <b>Copper Hill Run</b>',
  }, {
    instructions: 'Turn <b>left</b> onto <b>Silver Run</b><div style="font-size:0.9em">Destination will be on the right</div>',
  },])
})

