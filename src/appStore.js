const subscribers = {}

const store = {
  error: 'There was a problem loading this action. Refresh and try again',
  directions: [],
  isLoading: false,
  on: on,
  publish: publish,
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

function update (data) {
  Object.keys(data).forEach((id) => {
    store[id] = data[id]
    publish(`${id}-update`, store[id])
  })
  return store
}

export default store