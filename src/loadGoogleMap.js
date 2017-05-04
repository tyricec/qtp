import util from './util'

class GMapScriptAlreadyLoadedError extends Error {
  constructor(message) {
    message = 'GMapScriptAlreadyLoaded: '.concat(message)
    super(message)
  }
}

function loadGoogleMap () {
  return new Promise((resolve, reject) => {
    var gMapSrc = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA1_2TtftN8qv6qI-NYBQ9N7izoh9ps1YM&callback=qtp.initGMap'
    if (document.querySelector(`script[src="${gMapSrc}"]`)) {
      reject(new GMapScriptAlreadyLoadedError('Google Maps script tag was already added to the dom'))
    }
    let gScript = util.buildHTML('script', {
      src: gMapSrc,
    })

    window.qtp = {
      initGMap: onLoad,
    }

    document.body.appendChild(gScript)

    function onLoad() {
      resolve(window.google.maps)
    }
  })
}

export default loadGoogleMap