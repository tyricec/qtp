import loadGoogleMap from './loadGoogleMap'

var gMapSrc = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA1_2TtftN8qv6qI-NYBQ9N7izoh9ps1YM&callback=qtp.initGMap&libraries=places'

beforeEach(() => {
  var script = document.querySelector(`script[src="${gMapSrc}"]`)
  if (script) {
    document.body.removeChild(script)
  }
})

afterEach(() => {
  var script = document.querySelector(`script[src="${gMapSrc}"]`)
  if (script) {
    document.body.removeChild(script)
  }
})

test('loadGoogleMap loads google maps', () => {
  return loadGoogleMap().then((gmap) => {
    expect(gmap).toMatchSnapshot()
  })
})

test('loadGoogleMap throws error when attempting to load twice', () => {
  return loadGoogleMap().then(() => {
    return loadGoogleMap().catch((e) => { 
      return expect(/GMapScriptAlreadyLoaded/.test(e))
    })
  })
})