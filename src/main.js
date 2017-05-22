import appStore from './appStore'
import autocomplete from './autocomplete/autocomplete'
import AddressInquirer from './utils/AddressInquirer'
import loadGoogleMap from './utils/loadGoogleMap'
import renderPredictionList from './renderers/renderPredictionList'
import DirectionsRenderer from './renderers/DirectionsRenderer'
import directionsFetcher from './utils/directionsFetcher'
import googleDirectionsReducer from './utils/googleDirectionsReducer'

loadGoogleMap().then(gmap => {
  window.history.pushState(appStore, '')

  window.addEventListener('popstate', (evt) => {
    appStore.update(evt.state)
  })

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

    window.history.pushState(appStore,
    '')
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

  appStore.on('travelMode-update', () => {
    appStore.update({ showListView: false, })

    directionsFetcher.get(
      (new gmap.DirectionsService()).route,
      {
        destination: appStore.destination,
        origin: appStore.origin,
        travelMode: appStore.travelMode,
      }
    ).then(res => googleDirectionsReducer(res.status, res.result))
      .then(directions => appStore.update({ directions, showListView: true, }))
  })

  document.getElementById('qtp-form').addEventListener('submit', (event) => {
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

  document.getElementById('qtp-start-point').addEventListener('change', (evt) => {
    appStore.update({ origin: evt.target.value, })
  })

  document.getElementById('qtp-destination-point').addEventListener('change', (evt) => appStore.update({ destination: evt.target.value, }))

  document.querySelector('.qtp-options__select').addEventListener('change', (evt) => {
    appStore.update({ travelMode: evt.target.value, })
  })

})
