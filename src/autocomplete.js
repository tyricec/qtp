let timeout

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
            .then((response) => render(response))
            .catch((err) => err)
        } catch (e) {
          if (/TypeError.*not.*function/.test(e)) {
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