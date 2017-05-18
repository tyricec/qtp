import appStore from './appStore'
import autocomplete from './autocomplete/autocomplete'
import AddressInquirer from './utils/AddressInquirer'
import loadGoogleMap from './utils/loadGoogleMap'
import renderPredictionList from './renderers/renderPredictionList'
import DirectionsRenderer from './renderers/DirectionsRenderer'
import directionsFetcher from './utils/directionsFetcher'
import googleDirectionsReducer from './utils/googleDirectionsReducer'

loadGoogleMap().then(gmap => {
  const query = (input) => {
    const service = new gmap.places.AutocompleteService()

    const placeInquirer = new AddressInquirer((info, cb) => {
      service.getPlacePredictions(info, cb)
    })

    return placeInquirer.inquire({
      input,
    })
  }

  autocomplete.attach(
    document.getElementById('qtp-start-point'),
    query,
    renderPredictionList
  )

  autocomplete.attach(
    document.getElementById('qtp-destination-point'),
    query,
    renderPredictionList
  )

  appStore.on('directions-update', (directions) => {
    const renderer = new DirectionsRenderer(
      document.querySelector('.qtp-results'),
      directions
    )
    renderer.render()
  })

  appStore.publishFromEvent(
    document.getElementById('qtp-form'),
    'submit',
    'qtp-form-submit'
  ) 

  appStore.publishFromEvent(
    document.getElementById('qtp-start-point'),
    'change',
    'qtp-start-point-change'
  )

  appStore.publishFromEvent(
    document.getElementById('qtp-destination-point'),
    'change',
    'qtp-destination-point-change'
  )

  appStore.on('qtp-start-point-change', (evt) => { 
    appStore.update({ origin: evt.target.value, })
  })

  appStore.on('qtp-destination-point-change', (evt) => appStore.update({ destination: evt.target.value, }))

  appStore.on('qtp-form-submit', (event) => {
    event.preventDefault()

    document.querySelector('.qtp-results').classList.remove('qtp-results--hidden')
    document.querySelector('.qtp-results').classList.add('qtp-results--loading')

    event.target.classList.add('qtp-form--hidden')

    directionsFetcher.get(
      (new gmap.DirectionsService()).route,
      {
        destination: appStore.destination,
        origin: appStore.origin,
        travelMode: appStore.travelMode,
      }
    ).then(res => googleDirectionsReducer(res.status, res.result))
    .then(directions => appStore.update({ directions, }))
    .then(() => document.querySelector('.qtp-results').classList.remove('qtp-results--loading'))
  })
})
