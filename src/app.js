const {app} = require('electron')
const {createTray} = require('./tray')
const {startServer} = require('./server')

const instanceLock = app.requestSingleInstanceLock()

if (!instanceLock) {
  app.quit()
} else {
  app.whenReady().then(() => {
    createTray()
    startServer()
  })
}
