import util from './util'

function renderPredictionList(results) {
  const [predictions, status,] = results

  if (status === 'ZERO_RESULTS') {
    return false
  }
  if (status === 'OK') {
    return util.buildHTML('div', {
      class: 'qtp-autocomplete',
    }, predictions.map((prediction, idx) => {
      const listItem = util.buildHTML('li', {
        class: 'qtp-autocomplete__list-item',
        'data-qtp-value': prediction.description,
        role: 'option',
        id: `qtp-id-${idx}`,
      }, util.buildText(prediction.description))

      listItem.appendChild(util.buildHTML('hr', {
        class: 'qtp-autocomplete__hr',
      }))

      return listItem
    }).reduce((acc, current) => {
      acc.appendChild(current)
      return acc
    }, util.buildHTML('ul', { 
      class: 'qtp-autocomplete__list',
      role: 'listbox',
    })))
  }
}

export default renderPredictionList