const {notify} = require('./notifier')
const {setTrayToolTip} = require('./tray')

const showNotification = () => {
  let url = `http://${global.address || '0.0.0.0'}:${global.port}`
  notify({ message: `Server running @ ${url}` })
  setTrayToolTip(`${global.appName} @ ${url}`)
}

const startServer = () => {
  require('@nondanee/unblockneteasemusic/app')
  showNotification()
};

module.exports = {
  startServer
}