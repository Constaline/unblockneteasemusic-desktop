const {app} = require('electron')
const {showDialog, showNotification} = require('./notifier')
const {setTrayToolTip} = require('./tray')
const startUnblockServer = require('@nondanee/unblockneteasemusic/src/app');
const {waterfall} = require('async');
const portfinder = require('portfinder');
portfinder.basePort = global.DEFAULT_PORT;

const startServerInstance = () => {
  const checkPort = (callback) => {
    portfinder.getPortPromise()
      .then((port) => {
        if(port == global.DEFAULT_PORT) {
          callback(null)
        } else {
          callback(`Port ${global.DEFAULT_PORT} is already in use`)
        }
      })
      .catch((err) => {
        callback(`Could not get a free port, ${err}`)
      });
  }

  const startServer = (callback) => {
    startUnblockServer()
      .then(() => {
        let url = `http://${global.address || '0.0.0.0'}:${global.port}`
        showNotification({ message: `Server is running @ ${url}` })
        setTrayToolTip(`${global.appInfo.name} @ ${url}`)
      })
      .catch(error => {
        callback(error)
      })
  }

  waterfall([
    checkPort,
    startServer
  ], (err, result) => {
    showDialog({ message: `Server error: ${err}`})
      .then(() => {
        app.quit()
      })
  })
};

module.exports = {
  startServerInstance
}