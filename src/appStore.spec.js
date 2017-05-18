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

test('appStore adds event for dom events', (done) => {
  const button = document.createElement('button')
  appStore.publishFromEvent(button, 'click', 'form-click')

  appStore.on('form-click', (event) => {
    expect(event.target.tagName).toEqual(event.target.tagName)
    done()
  })

  button.dispatchEvent(new Event('click'))
})