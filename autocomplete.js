const autocomplete = {
  attach: function(input) {
    var element = document.createElement('div')
    var list = document.createElement('ul')

    element.className = 'qtp-autocomplete'
    list.className = 'qtp-autocomplete__list'

    element.appendChild(list)

    document.body.appendChild(element)
  }
}

module.exports = autocomplete