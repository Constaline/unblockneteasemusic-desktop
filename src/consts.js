const {app} = require('electron')
const path = require('path')
const packageJSON = require('../package.json')

global.ROOT_PATH = path.join(__dirname, '../')
global.ICON_PATH = path.join(ROOT_PATH, './assets/icon.png')

global.appInfo = {
  name: 'UnblockNeteaseMusic',
  version: app.getVersion(),
  platform: process.platform
};

global.tray = null;

