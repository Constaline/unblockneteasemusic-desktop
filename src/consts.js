const {app} = require('electron')
const path = require('path')
const Store = require('electron-store');
const {removeConfigFile} = require('./utils')

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
global.userConfig = {}

let configStoreOptions = {
  defaults: { 
    '__instruction__': 'After configuaration, please relaunch the app.', 
    '__source_list__': `['qq', 'kuwo', 'migu', 'xiami', 'baidu', 'kugou', 'joox', 'youtube']`,
    source: ['qq', 'kuwo', 'migu'],
    port: 16163
  },
  schema: {
    source: {
      type: 'array'
    },
    port: {
      type: 'number',
      maximum: 65535,
      minimum: 1
    },
  }
};

try {
  global.configStore = new Store(configStoreOptions);

  global.userConfig = {
    port: `${global.configStore.get('port')}`, 
    source: global.configStore.get('source')
  };
} catch (e) {
  console.log('Init Store ERROR:', e);
  removeConfigFile()
}