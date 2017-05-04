import loadGoogleMap from './loadGoogleMap'

afterEach(() => {
  var gMapSrc = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA1_2TtftN8qv6qI-NYBQ9N7izoh9ps1YM&callback=qtp.initGMap'
  var script = document.querySelector(`script[src="${gMapSrc}"]`)
  document.body.removeChild(script)
})

test('loadGoogleMap loads google maps', () => {
  return loadGoogleMap().then((gmap) => {
    expect(gmap).toMatchSnapshot()
  })
})

test('loadGoogleMap throws error when attempting to load twice', () => {
  loadGoogleMap()
  return loadGoogleMap().catch((e) => { 
    expect(/GMapScriptAlreadyLoaded/.test(e))
  })
})