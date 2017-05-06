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

  function removeCurrentElement() {
    let current = document.querySelector('.qtp-autocomplete')
    if (current) {
      current.parentElement.removeChild(current)
    }
  }

  autocomplete.on('render', (result, input) => {
    removeCurrentElement()
    if (result) {
      input.insertAdjacentElement('afterend', result)

      result.querySelectorAll('.qtp-autocomplete__list-item').forEach((item) => {
        item.addEventListener('mousedown', () => {
          input.value = item.getAttribute('data-qtp-value')
        })
      })
    }
  })

  autocomplete.on('error', () => {
    removeCurrentElement()
  })

  autocomplete.on('blur', () => {
    removeCurrentElement()
  })
})

autocomplete.attach(document.getElementById('qtp-start-point'))