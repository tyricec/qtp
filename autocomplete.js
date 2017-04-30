const autocomplete = {
  attach: function(input) {
    const element = document.createElement('div')
    const list = document.createElement('ul')
    const boundingRect = input.getBoundingClientRect()

    element.className = 'qtp-autocomplete'
    list.className = 'qtp-autocomplete__list'

    element.appendChild(list)

    element.style.top = boundingRect.bottom + 'px'
    element.style.left = boundingRect.left + 'px'

    document.body.appendChild(element)
  }
}

export { autocomplete }