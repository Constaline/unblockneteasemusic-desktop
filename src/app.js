const {app} = require('electron')
const {createTray} = require('./tray')
const {startServerInstance} = require('./server')
const {showDialog} = require('./notifier')

const instanceLock = app.requestSingleInstanceLock()

if (!instanceLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    showDialog({message: 'Another instance is already running'})
  })

  app.whenReady().then(() => {
    createTray()
    startServerInstance()
  })
}
