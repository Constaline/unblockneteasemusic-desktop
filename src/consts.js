const { app } = require('electron')
const path = require('path')
const Store = require('electron-store');
const { removeConfigFile } = require('./utils')

global.ROOT_PATH = path.join(__dirname, '../')
global.USERDATA_PATH = app.getPath('userData');
global.LOG_PATH = path.join(USERDATA_PATH, './log/')

global.ICON_PATH = {
  common: path.join(ROOT_PATH, './assets/icon.png'),
  tray: path.join(ROOT_PATH, './assets/tray@2x.png')
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
    '__source_list__': ["qq", "kuwo", "migu", "baidu", "kugou", "joox", "youtube", "bilibili", "pyncmd"],
    source: ['kuwo', 'migu', 'bilibili', 'pyncmd'],
    port: 16163
  },
  schema: {
    source: {
      type: 'array'
    },
    port: {
      type: 'number',
      maximum: 65530,
      minimum: 1
    },
  }
};

try {
  global.configStore = new Store(configStoreOptions);

  // 服务开双端口，用于解决音效页面访问问题
  // 参考 https://github.com/nondanee/UnblockNeteaseMusic/issues/537#issuecomment-629621533
  let _port = global.configStore.get('port');
  global.userConfig = {
    port: `${_port}:${_port + 1}`,
    source: global.configStore.get('source')
  };
} catch (e) {
  console.log('Init Store ERROR:', e);
  removeConfigFile()
}