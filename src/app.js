const { app } = require('electron')
const { createTray } = require('./tray')
const { startServerInstance } = require('./server')
const { showDialog } = require('./notifier')
const { appQuit } = require('./utils')

const instanceLock = app.requestSingleInstanceLock()

if (!instanceLock) {
  appQuit()
} else {
  app.on('second-instance', () => {
    showDialog({ message: 'Another instance is already running' })
  })

  app.whenReady().then(() => {
    createTray()
    startServerInstance()
  })
}
