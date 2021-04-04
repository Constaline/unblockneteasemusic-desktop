const { app, Menu, Tray, shell } = require('electron')
const { appQuit, appRelaunch } = require('./utils')

const contextMenu = Menu.buildFromTemplate([
  {
    label: `${global.appInfo.name} v${appInfo.version}`
  },
  {
    type: 'separator'
  },
  {
    label: `Configuration`,
    click: () => {
      global.configStore.openInEditor()
    }
  },
  {
    label: `View Log Files`,
    click: () => {
      shell.openExternal(global.LOG_PATH)
    }
  },
  {
    type: 'checkbox',
    label: 'Open At Login',
    checked: app.getLoginItemSettings().openAtLogin,
    click: () => {
      if (!app.isPackaged) { return; }
      app.setLoginItemSettings({
        openAtLogin: !app.getLoginItemSettings().openAtLogin,
      })
    }
  },
  { type: 'separator' },
  {
    label: 'Relaunch',
    click: () => {
      appRelaunch();
    }
  },
  {
    label: 'Exit',
    click: () => {
      appQuit()
    }
  }
]);

const createTray = () => {
  tray = new Tray(global.ICON_PATH.tray)
  tray.setToolTip(global.appInfo.name)
  tray.setContextMenu(contextMenu)
}

const setTrayToolTip = (tooltip) => {
  if (!tray) { return; }
  tray.setToolTip(tooltip)
}

module.exports = {
  createTray,
  setTrayToolTip
}