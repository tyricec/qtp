import googleDirectionsReducer from './googleDirectionsReducer'
import directionsResult from './__mocks__/directionsResult'

test('googleDirectionsReducer returns instructions', () => {
  const result = googleDirectionsReducer('OK', directionsResult())

  expect(result).toEqual([{
    instruction: 'Head <b>south</b> on <b>Brixton Ct</b> toward <b>Sheffield Dr</b>',
    maneuver: '',
  }, {
    instruction: 'Turn <b>left</b> onto <b>Sheffield Dr</b>',
    maneuver: 'turn-left',
  }, {
    instruction: 'Turn <b>left</b> onto <b>Heritage Dr</b>',
    maneuver: 'turn-left',
  }, {
    instruction: 'Turn <b>right</b> onto <b>Ironwood Ave</b>',
    maneuver: 'turn-right',
  }, {
    instruction: 'Turn <b>left</b> onto <b>Heacock St</b>',
    maneuver: 'turn-left',
  }, {
    instruction: 'Turn <b>left</b> onto <b>Parkland Ave</b>',
    maneuver: 'turn-left',
  }, {
    instruction: 'Turn <b>right</b> onto <b>Copper Hill Run</b>',
    maneuver: 'turn-right',
  }, {
    instruction: 'Turn <b>left</b> onto <b>Silver Run</b><div style="font-size:0.9em">Destination will be on the right</div>',
    maneuver: 'turn-left',
  },])
})

