const {app} = require('electron')
const {showDialog, showNotification} = require('./notifier')
const {setTrayToolTip} = require('./tray')
const startUnblockServer = require('@nondanee/unblockneteasemusic/src/app');

const startServer = () => {
  startUnblockServer()
    .then(() => {
      let url = `http://${global.address || '0.0.0.0'}:${global.port}`
      showNotification({ message: `Server is running @ ${url}` })
      setTrayToolTip(`${global.appInfo.name} @ ${url}`)
    })
    .catch(error => {
      showDialog({ message: `Server error: ${error}`})
        .then(() => {
          app.quit()
        })
    })
};

module.exports = {
  startServer
}