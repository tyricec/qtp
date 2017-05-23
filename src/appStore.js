const subscribers = {}

const appData = {
  destination: '',
  error: 'There was a problem loading this action. Refresh and try again',
  directions: [],
  isLoading: false,
  origin: '',
  showBack: true,
  showError: false,
  showForm: true,
  showListView: false,
  showMapView: false,
  showOptions: true,
  travelMode: 'DRIVING',
}

const store = {
  get: get,
  on: on,
  publish: publish,
  publishFromEvent: publishFromEvent,
  update: update,
}

function get() {
  return appData
}

function on (event, cb) {
  if (subscribers[event]) {
    subscribers[event].push(cb)
  } else {
    subscribers[event] = [cb,]
  }

  return function off() {
    subscribers[event].splice(
      subscribers[event].indexOf(cb)
    )
  }
}

function publish (event, ...data) {
  if (subscribers[event]) {
    subscribers[event].forEach((cb) => {
      cb(...data)
    })
  }
  return store
}

function publishFromEvent (target, domEvent, eventName) {
  const pub = (event) => {
    publish(eventName, event)
  }

  target.addEventListener(domEvent, pub)

  return function unsub () {
    target.removeEventListener(domEvent, pub)
    subscribers[eventName].splice(
      subscribers[eventName].indexOf(pub)
    )
  }
}

function update (data) {
  Object.keys(data).forEach((id) => {
    appData[id] = data[id]
    publish(`${id}-update`, appData[id])
  })
  return store
}

export default store