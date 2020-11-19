const {app} = require('electron')
const path = require('path')
const Store = require('electron-store');

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

global.configStore = new Store({
  defaults: { 
    '__instruction__': 'After configuaration, please relaunch the app.', 
    '__source_list__': `['qq', 'kuwo', 'migu', 'xiami', 'baidu', 'kugou', 'joox', 'youtube']`,
    source: ['qq', 'kuwo', 'migu'] 
  }
});

global.userConfig = {
  port: '16163',
  source: configStore.get('source')
}