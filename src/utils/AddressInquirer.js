class AddressInquirer {
  constructor(query) {
    this.query = query
  }

  inquire(info) {
    return new Promise((resolve) => {
      this.query(info, (...data) => {
        resolve(data)
      })
    })
  }
}

export default AddressInquirer