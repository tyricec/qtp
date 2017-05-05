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

    function onFocus() {
      this.addEventListener('input', onInput)
    }

    function onInput(evt) {
      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(function() {
        try {
          service(evt.target.value)
            .then((response) => {
              let result = render(response)
              notify('render', result)
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
      }, 2000)
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

function notify(evt, data) {
  if (subscribers[evt]) {
    subscribers[evt].forEach((subscriber) => subscriber(data))
  }
}

export default autocomplete