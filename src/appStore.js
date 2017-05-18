const subscribers = {}

const store = {
  error: 'There was a problem loading this action. Refresh and try again',
  directions: [],
  isLoading: false,
  on: on,
  publish: publish,
  publishFromEvent: publishFromEvent,
  showError: false,
  showForm: true,
  showListView: false,
  showMapView: false,
  showOptions: false,
  travelMode: 'DRIVING',
  update: update,
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

function publishFromEvent (target, domEvent, event) {
  const pub = (evt) => {
    evt.preventDefault()
    publish(event, target)
  }

  target.addEventListener(domEvent, pub)

  return function unsub () {
    target.removeEventListener(domEvent, pub)
    subscribers[event].splice(
      subscribers[event].indexOf(pub)
    )
  }
}

function update (data) {
  Object.keys(data).forEach((id) => {
    store[id] = data[id]
    publish(`${id}-update`, store[id])
  })
  return store
}

export default store