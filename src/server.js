const {notify} = require('./notifier')

const startServer = () => {
  require('@nondanee/unblockneteasemusic/app')
  notify({ message: `Server running @ http://${global.address || '0.0.0.0'}:${global.port}` })
};

module.exports = {
  startServer
}