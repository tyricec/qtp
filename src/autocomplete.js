let timeout
let subscribers = {}

class InvalidServiceError extends Error {
  constructor(message) {
    super(message)
  }
}

const autocomplete = {
  attach(input, service, render) {
    input.addEventListener('focus', onFocus)
    input.addEventListener('blur', onBlur)

    input.setAttribute('aria-autocomplete', 'list')
    input.setAttribute('role', 'combobox')
    input.setAttribute('aria-expanded', 'false')

    addDefaultSubscribers()

    function onFocus() {
      this.addEventListener('input', onInput)
      this.addEventListener('keyup', onKeyup)
    }

    function onBlur() {
      input.removeEventListener('input', onInput)
      notify('blur', input)
    }

    function onInput(evt) {
      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(function () {
        try {
          service(evt.target.value)
            .then((response) => {
              let result = render(response)
              notify('render', result, input)
              return result
            })
            .catch((err) => notify('error', err))
        } catch (e) {
          if (/TypeError.*not.*function/.test(e)) {
            let exception = new InvalidServiceError('InvalidServiceError: Service must be a function that accepts a query parameter and returns Array.')
            notify('error', exception)
            throw exception
          }
          else {
            throw e
          }
        }
      }, 400)
    }

    function onKeyup(evt) {
      switch (evt.key) {
      case 'ArrowDown': {
        let firstItem = document.querySelector('.qtp-autocomplete__list-item')
        let firstHR = document.querySelector('.qtp-autocomplete__hr')
        firstItem.setAttribute('class', `${firstItem.getAttribute('class')} qtp-autocomplete__list-item-selected`)

        firstHR.setAttribute(
          'class',
          `${firstHR.getAttribute('class')} qtp-autocomplete__hr-selected`
        )
      }
      }
    }
  },
  on(evt, cb) {
    if (subscribers[evt]) {
      subscribers[evt].push(cb)
    } else {
      subscribers[evt] = [cb,]
    }

    return function off() {
      subscribers[evt].splice(subscribers[evt].indexOf(cb))
    }
  },
  subscribers: {},
}

function notify(evt, ...data) {
  if (subscribers[evt]) {
    subscribers[evt].forEach((subscriber) => subscriber(...data))
  }
}

function addDefaultSubscribers() {
  autocomplete.on('render', (result, input) => {
    removeCurrentElement()
    if (result) {
      input.insertAdjacentHTML('afterend', result.outerHTML)

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

  function removeCurrentElement() {
    let current = document.querySelector('.qtp-autocomplete')
    if (current) {
      current.parentElement.removeChild(current)
    }
  }
}

export default autocomplete