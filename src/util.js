const util = {
  buildHTML: (type, attrs, inner) => {
    let element

    if (type) {
      element = document.createElement(type)
    }
    
    if (element && attrs) {
      Object.keys(attrs).forEach((attr) => {
        element.setAttribute(attr, attrs[attr])
      })
    }

    if (element && inner) {
      element.appendChild(inner)
    }

    return element
  },
  buildText: (text) => {
    return document.createTextNode(text)
  },
}

export default util