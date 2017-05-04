import util from './util'

function renderPredictionList(results) {
  const [predictions, status,] = results

  if (status === 'OK') {
    return util.buildHTML('div', {
      class: 'qtp-autocomplete',
    }, predictions.map((prediction) => {
      const listItem = util.buildHTML('li', {
        class: 'qtp-autocomplete__list-item',
      }, util.buildText(prediction.description))

      listItem.appendChild(util.buildHTML('hr', {
        class: 'qtp-autocomplete__hr',
      }))

      return listItem
    }).reduce((acc, current) => {
      acc.appendChild(current)
      return acc
    }, util.buildHTML('ul', { class: 'qtp-autocomplete__list', })))
  }
}

export default renderPredictionList