import autocomplete from './autocomplete'

jest.useFakeTimers()

let input
let renderText

beforeEach(() => {
  [input, renderText,] = setupTestDOM()
})

test('autocomplete queries service after typing', () => {
  const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
  const render = jest.fn(() => renderText)

  input.setAttribute('type', 'text')

  autocomplete.attach(input, service, render)

  input.focus()

  input.value = 'Test Address'

  input.dispatchEvent(new UIEvent('input', {
    target: input,
  }))

  jest.runOnlyPendingTimers()

  expect(service.mock.calls.length).toBe(1)
  expect(service.mock.calls[0][0]).toBe('Test Address')
})

test('autocomplete only queries once within timeout', () => {
  const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
  const render = jest.fn(() => renderText)

  input.setAttribute('type', 'text')

  autocomplete.attach(input, service, render)

  input.focus()

  input.value = 'Test Add'

  input.dispatchEvent(new UIEvent('input', {
    target: input,
  }))

  input.value = 'Test Address'

  jest.runTimersToTime(200)

  input.dispatchEvent(new UIEvent('input', {
    target: input,
  }))

  jest.runTimersToTime(700)

  expect(service.mock.calls.length).toBe(1)
  expect(service.mock.calls[0][0]).toBe('Test Address')
})

test('autocomplete throws error when service is invalid', () => {
  expect(() => {
    input.setAttribute('type', 'text')

    autocomplete.attach(input, {})

    input.focus()

    input.value = 'Test Add'

    input.dispatchEvent(new UIEvent('input', {
      target: input,
    }))

    jest.runTimersToTime(1100)
  }).toThrow(/InvalidServiceError/)
})

test('autocomplete notifies when data is rendered', (done) => {
  const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
  const render = jest.fn(() => renderText)

  input.setAttribute('type', 'text')

  const unsub = autocomplete.on('render', (renderedResult, input) => {
    expect(renderedResult.outerHTML).toMatchSnapshot()
    expect(input).toBeDefined()
    unsub()
    done()
  })

  autocomplete.attach(input, service, render)

  input.focus()

  input.value = 'Test Add'

  input.dispatchEvent(new UIEvent('input', {
    target: input,
  }))

  jest.runTimersToTime(1100)
})

test('autocomplete notifies of errors', (done) => {
  const service = {}
  const render = jest.fn(() => renderText)

  input.setAttribute('type', 'text')

  const unsub = autocomplete.on('error', (error) => {
    expect(error.message).toMatch(/InvalidService/)
    unsub()
    done()
  })

  autocomplete.attach(input, service, render)

  input.focus()

  input.value = 'Test Add'

  input.dispatchEvent(new UIEvent('input', {
    target: input,
  }))

  jest.runTimersToTime(2100)
})

test('autocomplete notifies blur event', (done) => {
  const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
  const render = jest.fn(() => renderText)

  const unsub = autocomplete.on('blur', (input) => {
    expect(input).toBeDefined()
    expect(input.value).toBe('Test Add')
    unsub()
    done()
  })

  autocomplete.attach(input, service, render)

  input.focus()

  input.value = 'Test Add'

  input.dispatchEvent(new UIEvent('input', {
    target: input,
  }))

  jest.runTimersToTime(2100)

  input.blur()
})

test('autocomplete adds aria attributes to input', () => {
  const service = jest.fn(Promise.resolve(autocompleteResponse()))
  const render = jest.fn(() => renderText)

  input.setAttribute('type', 'text')

  autocomplete.attach(input, service, render)

  expect(input.getAttribute('aria-autocomplete')).toBeTruthy()
  expect(input.getAttribute('role')).toBeTruthy()
})

describe('autocomplete key events', () => {
  test('arrow down selects first item', (done) => {
    const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
    const render = jest.fn(() => renderText)

    input.setAttribute('type', 'text')

    autocomplete.attach(input, service, render)

    input.focus()

    input.value = 'Test Change'

    input.dispatchEvent(new UIEvent('input', {
      target: input,
    }))

    const unsub = autocomplete.on('render', () => {
      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'ArrowDown',
      }))

      const listItem = document.querySelector('.qtp-autocomplete__list-item__selected')
      expect(listItem).toBeTruthy()
      expect(listItem.outerHTML).toMatchSnapshot()

      unsub()

      done()
    })
  })

  test('arrow down selects next item in list', (done) => {
    const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
    const render = jest.fn(() => renderText)

    input.setAttribute('type', 'text')

    autocomplete.attach(input, service, render)

    input.focus()

    input.value = 'Test Change'

    input.dispatchEvent(new UIEvent('input', {
      target: input,
    }))

    const unsub = autocomplete.on('render', () => {
      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'ArrowDown',
      }))

      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'ArrowDown',
      }))

      const prevItem = document.querySelectorAll('.qtp-autocomplete__list-item')[0]
      const listItem = document.querySelector('.qtp-autocomplete__list-item__selected')
      expect(prevItem.getAttribute('class')).not.toContain(/qtp-autocomplete__list-item__selected/)
      expect(listItem).toBeTruthy()
      expect(listItem.outerHTML).toMatchSnapshot()

      unsub()

      done()
    })
  })

  test('arrow down deselects last element when last is selected', (done) => {
    const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
    const render = jest.fn(() => renderText)

    input.setAttribute('type', 'text')

    autocomplete.attach(input, service, render)

    input.focus()

    input.value = 'Test Change'

    input.dispatchEvent(new UIEvent('input', {
      target: input,
    }))

    const unsub = autocomplete.on('render', () => {
      const current = document.querySelector('.qtp-autocomplete__list')
        .lastChild

      current.setAttribute('class', `${current.getAttribute('class')} qtp-autocomplete__list-item__selected`)

      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'ArrowDown',
      }))

      const listItem = document.querySelector('.qtp-autocomplete__list-item__selected')
      expect(listItem).toBeFalsy()

      unsub()

      done()
    })
  })

  test('arrow up selects last item in list', (done) => {
    const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
    const render = jest.fn(() => renderText)

    input.setAttribute('type', 'text')

    autocomplete.attach(input, service, render)

    input.focus()

    input.value = 'Test Change'

    input.dispatchEvent(new UIEvent('input', {
      target: input,
    }))

    const unsub = autocomplete.on('render', () => {
      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'ArrowUp',
      }))

      const listItem = document.querySelector('.qtp-autocomplete__list-item__selected')
      expect(listItem).toBeTruthy()
      expect(listItem.outerHTML).toMatchSnapshot()

      unsub()

      done()
    })

    jest.runTimersToTime(2100)
  })

  test('arrow up selects previous item in list', (done) => {
    const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
    const render = jest.fn(() => renderText)

    input.setAttribute('type', 'text')

    autocomplete.attach(input, service, render)

    input.focus()

    input.value = 'Test Change'

    input.dispatchEvent(new UIEvent('input', {
      target: input,
    }))

    const unsub = autocomplete.on('render', () => {
      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'ArrowUp',
      }))

      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'ArrowUp',
      }))

      const lastItem = document.querySelector('.qtp-autocomplete__list').lastChild
      const listItem = document.querySelector('.qtp-autocomplete__list-item__selected')
      expect(listItem).toBeTruthy()
      expect(listItem.outerHTML).not.toEqual(lastItem.outerHTML)
      expect(listItem.outerHTML).toMatchSnapshot()

      unsub()

      done()
    })

    jest.runTimersToTime(2100)
  })

  test('arrow up deselects first item in list when first is selected', (done) => {
    const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
    const render = jest.fn(() => renderText)

    input.setAttribute('type', 'text')

    autocomplete.attach(input, service, render)

    input.focus()

    input.value = 'Test Change'

    input.dispatchEvent(new UIEvent('input', {
      target: input,
    }))

    const unsub = autocomplete.on('render', () => {
      const current = document.querySelector('.qtp-autocomplete__list')
        .firstChild

      current.classList.add('qtp-autocomplete__list-item__selected')

      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'ArrowUp',
      }))

      const listItem = document.querySelector('.qtp-autocomplete__list-item__selected')
      expect(listItem).toBeFalsy()

      unsub()

      done()
    })   

    jest.runOnlyPendingTimers()
  })

  test('selecting item sets value of input', (done) => {
    const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
    const render = jest.fn(() => renderText)

    input.setAttribute('type', 'text')

    autocomplete.attach(input, service, render)

    input.focus()

    input.value = 'Test Change'

    input.dispatchEvent(new UIEvent('input', {
      target: input,
    }))

    const unsub = autocomplete.on('render', () => {
      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'ArrowDown',
      }))

      expect(input.value).toBe('1')

      unsub()

      done()
    })   

    jest.runOnlyPendingTimers()
  })

  test('deselecting returns previous typed value', (done) => {
    const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
    const render = jest.fn(() => renderText)

    input.setAttribute('type', 'text')

    autocomplete.attach(input, service, render)

    input.focus()

    input.value = 'Test Change'

    input.dispatchEvent(new UIEvent('input', {
      target: input,
    }))

    const unsub = autocomplete.on('render', () => {
      const listItem = document.querySelector('.qtp-autocomplete__list')
        .lastChild
      listItem.classList.add('qtp-autocomplete__list-item__selected')
      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'ArrowDown',
      }))

      expect(input.value).toBe('Test Change')

      unsub()

      done()
    })   

    jest.runOnlyPendingTimers()
  })

  test('set aria-activedescendant when value is set', (done) => {
    const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
    const render = jest.fn(() => renderText)

    input.setAttribute('type', 'text')

    autocomplete.attach(input, service, render)

    input.focus()

    input.value = 'Test Change'

    input.dispatchEvent(new UIEvent('input', {
      target: input,
    }))

    const unsub = autocomplete.on('render', () => {
      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'ArrowDown',
      }))

      var listItem = document.querySelector('.qtp-autocomplete__list-item__selected')

      expect(input.getAttribute('aria-activedescendant')).toBe(listItem.getAttribute('id'))

      unsub()

      done()
    })   

    jest.runOnlyPendingTimers()
  })

  test('escape key notifies to close', (done) => {
    const service = jest.fn(() => Promise.resolve(autocompleteResponse()))
    const render = jest.fn(() => renderText)

    input.setAttribute('type', 'text')

    autocomplete.attach(input, service, render)

    input.focus()

    input.value = 'Test Change'

    input.dispatchEvent(new UIEvent('input', {
      target: input,
    }))

    const unsub = autocomplete.on('render', () => {
      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'ArrowDown',
      }))

      input.dispatchEvent(new KeyboardEvent('keyup', {
        target: input,
        key: 'Escape',
      }))

      unsub()
    })

    const unsubClose = autocomplete.on('close', () => {
      expect(input.value).toBe('Test Change')

      unsubClose()

      done()
    })

    jest.runOnlyPendingTimers() 
  })
})

function setupTestDOM() {
  let input = document.createElement('input')
  let hr = document.createElement('hr')
  input.setAttribute('type', 'text')

  let renderText = autocompleteList()

  document.body.appendChild(input)
  document.body.appendChild(hr)
  document.body.appendChild(renderText)

  return [input, renderText,]
}

function autocompleteList() {
  var container = document.createElement('div')
  container.setAttribute('class', 'qtp-autocomplete')
  var list = document.createElement('ul')
  list.setAttribute('class', 'qtp-autocomplete__list')

  for (let i = 1;i <= 3; i++) {
    let item = document.createElement('li')
    let hr = document.createElement('hr')

    item.setAttribute('class', 'qtp-autocomplete__list-item')
    item.innerHTML = i
    item.setAttribute('data-qtp-value', i)
    item.setAttribute('id', `qtp-id-${i}`)

    hr.setAttribute('class', 'qtp-autocomplete__hr')

    item.appendChild(hr)
    list.appendChild(item)
  }

  container.appendChild(list)

  return container
}

function autocompleteResponse() {
  return [[
    {
      description: '12041 Brixton Court, Moreno Valley, CA, United States',
      id: '81c7c2e61a06669046f9d7fd0e5787362019c3ed',
      matched_substrings: [
        {
          length: 13,
          offset: 0,
        },
      ],
      place_id: 'EjUxMjA0MSBCcml4dG9uIENvdXJ0LCBNb3Jlbm8gVmFsbGV5LCBDQSwgVW5pdGVkIFN0YXRlcw',
      reference: 'CkQ5AAAAc4wMlbuSGAyazq-xqfvzCElV9iTiJW3NWhBbDB45el3y5f2AXsnRALnzteOV6TzAL2o-7ysNwnEeI8cR0MpWthIQFiIG1GLve1kSsSYSHZCx5xoUk_p4U45UCyt8Q5YdAp3fPRWJEO0',
      structured_formatting: {
        main_text: '12041 Brixton Court',
        main_text_matched_substrings: [
          {
            length: 13,
            offset: 0,
          },
        ],
        secondary_text: 'Moreno Valley, CA, United States',
      },
      terms: [
        {
          offset: 0,
          value: '12041 Brixton Court',
        },
        {
          offset: 21,
          value: 'Moreno Valley',
        },
        {
          offset: 36,
          value: 'CA',
        },
        {
          offset: 40,
          value: 'United States',
        },
      ],
      types: [
        'route',
        'geocode',
      ],
    },
    {
      description: '12041 Brixton Road, Pasadena, CA, United States',
      id: '638c80b39ff0aec050204a5958722ea06a644a3d',
      matched_substrings: [
        {
          length: 13,
          offset: 0,
        },
      ],
      place_id: 'Ei8xMjA0MSBCcml4dG9uIFJvYWQsIFBhc2FkZW5hLCBDQSwgVW5pdGVkIFN0YXRlcw',
      reference: 'CkQzAAAAvS0ueKRBPGO7BAbYr2PKymIj6KxYKwcgRLoO27Y_v8mHpb2APHQx2sKQwiRwsvNpSe2daFZCOb7PX52yYFRp5hIQzTBCTuLPA10IocIvtNjcgRoULyA788vIPuUsOLxWxhZ4zm4QkB8',
      structured_formatting: {
        main_text: '12041 Brixton Road',
        main_text_matched_substrings: [
          {
            length: 13,
            offset: 0,
          },
        ],
        secondary_text: 'Pasadena, CA, United States',
      },
      terms: [
        {
          offset: 0,
          value: '12041 Brixton Road',
        },
        {
          offset: 20,
          value: 'Pasadena',
        },
        {
          offset: 30,
          value: 'CA',
        },
        {
          offset: 34,
          value: 'United States',
        },
      ],
      types: [
        'route',
        'geocode',
      ],
    },
    {
      description: '12041 Brixton Cove, Temecula, CA, United States',
      id: '7a248380a3969e44107b04ce0d005a17be1acd18',
      matched_substrings: [
        {
          length: 13,
          offset: 0,
        },
      ],
      place_id: 'Ei8xMjA0MSBCcml4dG9uIENvdmUsIFRlbWVjdWxhLCBDQSwgVW5pdGVkIFN0YXRlcw',
      reference: 'CkQzAAAAkaWukqp70OGNqgmEVUQA0kc34Gps_qHXAly4YchFGUoEc607KbWnNs9fYy6gG7L04BFGhoXdDPTH9a2FdT-7TBIQG5VVLZUbZa_CE15ruwV3ZhoUUbDbV6R-3IeOsV5Eiapjx5YoFgo',
      structured_formatting: {
        main_text: '12041 Brixton Cove',
        main_text_matched_substrings: [
          {
            length: 13,
            offset: 0,
          },
        ],
        secondary_text: 'Temecula, CA, United States',
      },
      terms: [
        {
          offset: 0,
          value: '12041 Brixton Cove',
        },
        {
          offset: 20,
          value: 'Temecula',
        },
        {
          offset: 30,
          value: 'CA',
        },
        {
          offset: 34,
          value: 'United States',
        },
      ],
      types: [
        'route',
        'geocode',
      ],
    },
    {
      description: '12041 Brixton Place, San Diego, CA, United States',
      id: 'ee4f240db6cbe8360d9547a61aa4c2bec5fc7cb2',
      matched_substrings: [
        {
          length: 13,
          offset: 0,
        },
      ],
      place_id: 'EjExMjA0MSBCcml4dG9uIFBsYWNlLCBTYW4gRGllZ28sIENBLCBVbml0ZWQgU3RhdGVz',
      reference: 'CkQ1AAAA_J2y-ox-NZsCdNTHfcn0dboLr1sIEY0Cg3OX1MiXhbGwlYQTOP_GxexV9owURPuL9gKf135wqiEqibh6j09PABIQz0GzW8lC74sN1DMUQCzU3RoUPdnjclI86eSUdMFTUTNLi8X94h8',
      structured_formatting: {
        main_text: '12041 Brixton Place',
        main_text_matched_substrings: [
          {
            length: 13,
            offset: 0,
          },
        ],
        secondary_text: 'San Diego, CA, United States',
      },
      terms: [
        {
          offset: 0,
          value: '12041 Brixton Place',
        },
        {
          offset: 21,
          value: 'San Diego',
        },
        {
          offset: 32,
          value: 'CA',
        },
        {
          offset: 36,
          value: 'United States',
        },
      ],
      types: [
        'route',
        'geocode',
      ],
    },
    {
      description: '12041 Brixton Court, Bakersfield, CA, United States',
      id: 'e9a1e5a950fef9ed5f85495da3512c0b37fd17dd',
      matched_substrings: [
        {
          length: 13,
          offset: 0,
        },
      ],
      place_id: 'EjMxMjA0MSBCcml4dG9uIENvdXJ0LCBCYWtlcnNmaWVsZCwgQ0EsIFVuaXRlZCBTdGF0ZXM',
      reference: 'CkQ3AAAAFDXuvTHVmBZmyxRt_QrvBy5wu7n4co-iFjcUSXY5OzCYOEFLur8OCfzg3c7plDjUTJSf1SEkMPZmwO6RiEeOixIQWLTNhDE9PeYar6QqtYb6SBoUzk_ULaShhdYJFUT0RUJf8VjA-LI',
      structured_formatting: {
        main_text: '12041 Brixton Court',
        main_text_matched_substrings: [
          {
            length: 13,
            offset: 0,
          },
        ],
        secondary_text: 'Bakersfield, CA, United States',
      },
      terms: [
        {
          offset: 0,
          value: '12041 Brixton Court',
        },
        {
          offset: 21,
          value: 'Bakersfield',
        },
        {
          offset: 34,
          value: 'CA',
        },
        {
          offset: 38,
          value: 'United States',
        },
      ],
      types: [
        'route',
        'geocode',
      ],
    },
  ], 'OK',]
}