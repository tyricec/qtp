let timeout

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
        service(evt.target.value)
      }, 1000)
    }
  },
}

export default autocomplete