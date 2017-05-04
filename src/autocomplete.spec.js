import autocomplete from './autocomplete'

jest.useFakeTimers()

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

  jest.runOnlyPendingTimers()

  expect(service.mock.calls.length).toBe(1)
  expect(service.mock.calls[0][0]).toBe('Test Address')
})

test('autocomplete only queries once within timeout', () => {
  const input = document.createElement('input')
  const service = jest.fn()

  input.setAttribute('type', 'text')

  autocomplete.attach(input, service)

  input.focus()

  input.value = 'Test Add'

  input.dispatchEvent(new UIEvent('input', {
    target: input,
  }))

  input.value = 'Test Address'

  jest.runTimersToTime(400)

  input.dispatchEvent(new UIEvent('input', {
    target: input,
  }))

  jest.runTimersToTime(1600)

  expect(service.mock.calls.length).toBe(1)
  expect(service.mock.calls[0][0]).toBe('Test Address')
})

test('autocomplete throws error when service is invalid', () => {
  expect(() => {
    const input = document.createElement('input')

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