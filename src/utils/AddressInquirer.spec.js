import AddressInquirer from './AddressInquirer'

test('AddressInquirer queries with function passed in', () => {
  const query = jest.fn()
  const inquirer = new AddressInquirer(query)

  inquirer.inquire({
    search: 'Incomplete Address',
  })

  expect(query.mock.calls.length).toBe(1)
  expect(query.mock.calls[0][0]).toEqual({
    search: 'Incomplete Address',
  })
})

test('AddressInquirer returns data from query', () => {
  const query = jest.fn((info, cb) => { 
    cb([{
      value: 'Address 1',
    }, {
      value: 'Address 2',
    },], 'OK') 
  })

  const inquirer = new AddressInquirer(query)

  return inquirer.inquire('Incomplete Address').then((data) => {
    const [result, status,] = data

    expect(result).toEqual([{
      value: 'Address 1',
    }, {
      value: 'Address 2',
    },])

    expect(status).toBe('OK')
  })
})