const {app} = require('electron')
const {notify} = require('./notifier')
const {setTrayToolTip} = require('./tray')
const startUnblockServer = require('@nondanee/unblockneteasemusic/src/app');

const startServer = () => {
  startUnblockServer()
    .then(() => {
      let url = `http://${global.address || '0.0.0.0'}:${global.port}`
      notify({ message: `Server is running @ ${url}` })
      setTrayToolTip(`${global.appName} @ ${url}`)
    })
    .catch(error => {
      notify({ message: `Server error: ${error}`})
        .then(() => {
          app.quit()
        })
    })
};

module.exports = {
  startServer
}