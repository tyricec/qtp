import directionsFetcher from './directionsFetcher'
import directionsResult from './__mocks__/directionsResult'

test('directionsFetcher returns directionsResult', () => {
  const service = jest.fn((request, cb) => {
    return cb('OK', directionsResult())
  })

  return directionsFetcher.get(service, {
    origin: 'Origin Address',
    destination: 'Destination Address',
    travelMode: 'DRIVING',
  }).then(function(resp) {
    expect(resp.status).toEqual('OK')
    expect(resp.result).toEqual(directionsResult())
  })
})
