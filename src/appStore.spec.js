import appStore from './appStore'

test('appStore notifies subscribers of events', (done) => {
  appStore.on('form-submit', (data) => {
    expect(data).toBe(true)
    done()
  })

  appStore.publish('form-submit', true)
})

test('appStore notifies of store updates', (done) => {
  appStore.on('directions-update', (data) => {
    expect(data).toEqual([{
      instruction: 'Turn left',
    },])
    done()
  })

  appStore.update({ 
    directions: [{ instruction: 'Turn left', },],
  })
})