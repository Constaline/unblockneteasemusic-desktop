const {app} = require('electron')
const path = require('path')

global.ROOT_PATH = path.join(__dirname, '../')

global.ICON_PATH = {
  common: path.join(ROOT_PATH, './assets/icon.png'),
  tray: path.join(ROOT_PATH, './assets/tray.png')
}

global.DEFAULT_PORT = 16163

global.appInfo = {
  name: 'UnblockNeteaseMusic',
  version: app.getVersion(),
  platform: process.platform
};

global.tray = null;

