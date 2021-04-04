const { showDialog, showNotification } = require('./notifier')
const { setTrayToolTip } = require('./tray')
const startUnblockServer = require('../lib/UnblockNeteaseMusic/src/app');
const { waterfall } = require('async');
const portfinder = require('portfinder');
const { appQuit } = require('./utils')

const startServerInstance = () => {
  let _port = global.userConfig.port.split(':').map(string => parseInt(string));
  let _basePort = _port[0];
  portfinder.basePort = _basePort;
  const checkPort = (callback) => {
    portfinder.getPortPromise()
      .then((port) => {
        if (port == _basePort) {
          callback(null)
        } else {
          callback(`Port ${_port} is already in use`)
        }
      })
      .catch((err) => {
        callback(`Could not get a free port, ${err}`)
      });
  }

  const startServer = (callback) => {
    startUnblockServer()
      .then(() => {
        let url = `http://${global.address || '127.0.0.1'}:${global.port}`
        showNotification({ message: `Server is running @ ${url}` })
        setTrayToolTip(`${global.appInfo.name} @ ${url}`)
        console.log('current source:', global.userConfig.source)
      })
      .catch(error => {
        callback(error)
      })
  }

  waterfall([
    checkPort,
    startServer
  ], (err, result) => {
    showDialog({ message: `Server error: ${err}` })
      .then(() => {
        appQuit()
      })
  })
};

module.exports = {
  startServerInstance
}