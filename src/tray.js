const {app, Menu, Tray, shell} = require('electron')

const contextMenu = Menu.buildFromTemplate([
  {
    label: `${global.appInfo.name} v${appInfo.version}`
  },
  {
    type: 'separator' 
  },
  {
    label: `ViewLogFiles`,
    click: () => {
     shell.openExternal(global.LOG_PATH)
    }
  },
  {
    type : 'checkbox',
    label: 'OpenAtLogin',
    checked: app.getLoginItemSettings().openAtLogin,
    click: () => {
      if(!app.isPackaged){ return; }
      app.setLoginItemSettings({
        openAtLogin: !app.getLoginItemSettings().openAtLogin,
      })
    }
  },
  { type: 'separator' },
  { 
    label: 'Relaunch', 
    click: () => {
      app.relaunch();
      app.exit(0);
    }
  },
  { 
    label: 'Exit', 
    click: () => {
      app.quit()  
    }
  }
]);

const createTray = () => {
  tray = new Tray(global.ICON_PATH.tray)
  tray.setToolTip(global.appInfo.name)
  tray.setContextMenu(contextMenu)
}

const setTrayToolTip = (tooltip) => {
  if(!tray) { return; }
  tray.setToolTip(tooltip)
}

module.exports = {
  createTray,
  setTrayToolTip
}