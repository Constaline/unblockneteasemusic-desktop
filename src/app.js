const {app} = require('electron')
const {createTray} = require('./tray')
const {startServer} = require('./server')
const {notify} = require('./notifier')

const instanceLock = app.requestSingleInstanceLock()

if (!instanceLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    notify({message: 'Another instance is already running'})
  })

  app.whenReady().then(() => {
    createTray()
    startServer()
  })
}
