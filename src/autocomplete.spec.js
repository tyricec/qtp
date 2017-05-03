import autocomplete from './autocomplete'

test('autocomplete queries service after typing', () => {
  const input = document.createElement('input')
  const service = jest.fn()

  input.setAttribute('type', 'text')

  autocomplete.attach(input, service)

  input.focus()

  input.value = 'Test Address'

  input.dispatchEvent(new UIEvent('input', {
    target: input,
  }))

  expect(service.mock.calls.length).toBe(1)
  expect(service.mock.calls[0][0]).toBe('Test Address')
})