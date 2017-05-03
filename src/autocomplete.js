const autocomplete = {
  attach(input, service) {
    input.addEventListener('focus', onFocus)

    function onFocus() {
      this.addEventListener('input', onInput)
    }

    function onInput(evt) {
      service(evt.target.value)
    }
  },
}

export default autocomplete