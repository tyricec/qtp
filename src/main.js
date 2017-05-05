import autocomplete from './autocomplete'
import AddressInquirer from './AddressInquirer'
import loadGoogleMap from './loadGoogleMap'
import renderPredictionList from './renderPredictionList'

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

  autocomplete.on('render', (result, input) => {
    if (document.querySelector('.qtp-autocomplete')) {
      document.body.removeChild(document.querySelector('.qtp-autocomplete'))
    }

    if (result) {
      document.body.appendChild(result)

      result.querySelectorAll('.qtp-autocomplete__list-item').forEach((item) => {
        item.addEventListener('mousedown', () => {
          input.value = item.getAttribute('data-qtp-value')
        })
      })
    }
  })

  autocomplete.on('error', () => {
    if (document.querySelector('.qtp-autocomplete')) {
      document.body.removeChild(document.querySelector('.qtp-autocomplete'))
    }
  })

  autocomplete.on('blur', () => {
    if (document.querySelector('.qtp-autocomplete')) {
      document.body.removeChild(document.querySelector('.qtp-autocomplete'))
    }
  })
})

autocomplete.attach(document.getElementById('qtp-start-point'))