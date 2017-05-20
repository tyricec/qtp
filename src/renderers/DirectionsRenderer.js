import iconStore from '../utils/iconStore'

export default class DirectionsRenderer {
  constructor(element, directions) {
    this.container = element
    update.bind(this)(directions)
  }

  render() {
    if (this.container.firstChild)
      this.container.replaceChild(this.list, this.container.firstChild)
    else
      this.container.appendChild(this.list)
  }
}

function update(directions) {
  const results = document.createDocumentFragment()
  const resultList = document.createElement('ul')
  resultList.setAttribute('class', 'qtp-results__list')

  results.appendChild(resultList)

  this.list = results

  directions.forEach((step) => {
    const maneuver = iconStore.getIconElement(step.maneuver)
    const listItem = document.createElement('li')
    const listItemSeparator = document.createElement('hr')
    const instructionContainer = document.createElement('div')
    const instruction = document.createElement('template')

    if (maneuver) {
      maneuver.classList.add('qtp-results__icon')
      // IE Compatible Workaround
      Array.prototype.forEach.call(maneuver.childNodes, (child) => {
        child.classList.add('qtp-results__icon-path')
      })

      listItem.appendChild(maneuver)
    }

    instruction.innerHTML = step.instruction

    listItem.setAttribute('class', 'qtp-results__list-item')
    listItemSeparator.setAttribute('class', 'qtp-results__list-hr')

    instructionContainer.appendChild(instruction.content)
    
    listItem.appendChild(instructionContainer)
    listItem.appendChild(listItemSeparator)

    resultList.appendChild(listItem)
  })
}