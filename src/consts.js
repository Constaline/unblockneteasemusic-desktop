const {app} = require('electron')
const path = require('path')

global.ROOT_PATH = path.join(__dirname, '../')
global.ICON_PATH = path.join(ROOT_PATH, './resources/logo.png')

global.appName = 'UnblockNeteaseMusic';
global.appInfo = {
  name: 'UnblockNeteaseMusic',
  version: app.getVersion(),
  platform: process.platform
};

global.tray = null;

