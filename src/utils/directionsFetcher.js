const directionsFetcher = {
  get: get,
}

function get(service, request) {
  return new Promise((resolve, reject) => {
    try {
      service(request, (status, result) => {
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