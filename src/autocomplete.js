let timeout

class InvalidServiceError extends Error {
  constructor(message) {
    super(message)
  }
}

const autocomplete = {
  attach(input, service) {
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
        } catch (e) {
          if (/TypeError/.test(e)) {
            throw new InvalidServiceError('InvalidServiceError: Service must be a function that accepts a query parameter and returns Array.')
          }
          else {
            throw e
          }
        }
      }, 1000)
    }
  },
}

export default autocomplete