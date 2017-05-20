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

  appStore.on('showForm-update', (showForm) => {
    if (showForm)
      document.getElementById('qtp-form').classList.remove('qtp-form--hidden')
    else
      document.getElementById('qtp-form').classList.add('qtp-form--hidden')
  })

  appStore.on('showListView-update', (showListView) => {
    if (showListView)
      document.querySelector('.qtp-results').classList.remove('qtp-results--hidden')
    else
      document.querySelector('.qtp-results').classList.add('qtp-results--hidden')
  })

  appStore.on('showOptions-update', (showOptions) => {
    if (showOptions)
      document.querySelector('.qtp-options').classList.remove('qtp-options--hidden')
    else
      document.querySelector('.qtp-options').classList.add('qtp-options--hidden')
  })

  appStore.on('showBack-update', (showBack) => {
    if (showBack)
      document.querySelector('.qtp-back-button').classList.remove('qtp-back-button--hidden')
    else
      document.querySelector('.qtp-back-button').classList.add('qtp-back-button--hidden')
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
    document.querySelector('.qtp-back-button'),
    'click',
    'qtp-back-button'
  )

  appStore.publishFromEvent(
    document.getElementById('qtp-destination-point'),
    'change',
    'qtp-destination-point-change'
  )

  appStore.on('qtp-back-button', () => {
    appStore.update({ showForm: true, showListView: false, showOptions: false, showBack: false, })
  })

  appStore.on('qtp-start-point-change', (evt) => { 
    appStore.update({ origin: evt.target.value, })
  })

  appStore.on('qtp-destination-point-change', (evt) => appStore.update({ destination: evt.target.value, }))

  appStore.on('qtp-form-submit', (event) => {
    event.preventDefault()

    appStore.update({ showForm: false, })

    directionsFetcher.get(
      (new gmap.DirectionsService()).route,
      {
        destination: appStore.destination,
        origin: appStore.origin,
        travelMode: appStore.travelMode,
      }
    ).then(res => googleDirectionsReducer(res.status, res.result))
    .then(directions => appStore.update({ directions, }))
    .then(() => appStore.update({ showListView: true, showBack: true, showOptions: true, }))
  })
})
