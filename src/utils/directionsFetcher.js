const directionsFetcher = {
  get: get,
}

function get(service, request) {
  return new Promise((resolve, reject) => {
    try {
      service(request, (result, status) => {
        resolve({
          status,
          result,
        })
      })
    } catch (e) {
      reject(e)
    }
  })
}

export default directionsFetcher