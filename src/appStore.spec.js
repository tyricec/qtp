import appStore from './appStore'

beforeEach(() => {
  appStore.update({
    destination: '',
    error: 'There was a problem loading this action. Refresh and try again',
    directions: [],
    isLoading: false,
    origin: '',
    showBack: false,
    showError: false,
    showForm: true,
    showListView: false,
    showMapView: false,
    showOptions: false,
    travelMode: 'DRIVING',
  })
})

test('appStore notifies subscribers of events', (done) => {
  const unsub = appStore.on('form-submit', (data) => {
    unsub()
    expect(data).toBe(true)
    done()
  })

  appStore.publish('form-submit', true)
})

test('appStore notifies of store updates', (done) => {
  const unsub = appStore.on('directions-update', (data) => {
    unsub()
    expect(data).toEqual([{
      instruction: 'Turn left',
    },])
    done()
  })

  appStore.update({
    directions: [{ instruction: 'Turn left', },],
  })
})

test('appStore returns current app data', () => {
  const result = appStore.get()

  expect(result).toEqual({
    destination: '',
    error: 'There was a problem loading this action. Refresh and try again',
    directions: [],
    isLoading: false,
    origin: '',
    showBack: false,
    showError: false,
    showForm: true,
    showListView: false,
    showMapView: false,
    showOptions: false,
    travelMode: 'DRIVING',
  })
})

test('appStore adds event for dom events', (done) => {
  const button = document.createElement('button')
  appStore.publishFromEvent(button, 'click', 'form-click')

  const unsub = appStore.on('form-click', (event) => {
    unsub()
    expect(event.target.tagName).toEqual(event.target.tagName)
    done()
  })

  button.dispatchEvent(new Event('click'))
})