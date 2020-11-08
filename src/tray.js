const {app, Menu, Tray} = require('electron')

const createTray = () => {
  tray = new Tray(ICON_PATH)
  const contextMenu = Menu.buildFromTemplate([
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
  ])
  tray.setToolTip(global.appName)
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