const {app} = require('electron')
const path = require('path')

global.ROOT_PATH = path.join(__dirname, '../')
global.USERDATA_PATH = app.getPath('userData');
global.LOG_PATH = path.join(USERDATA_PATH, './log/')

global.ICON_PATH = {
  common: path.join(ROOT_PATH, './assets/icon.png'),
  tray: path.join(ROOT_PATH, './assets/tray.png')
}

global.appInfo = {
  name: 'UnblockNeteaseMusic',
  version: app.getVersion(),
  platform: process.platform
};

global.tray = null;

global.userConfig = {
  port: '16163',
  source: ['qq', 'kuwo', 'migu']
}