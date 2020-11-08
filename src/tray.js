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
  tray.setToolTip('UnblockNeteaseMusic')
  tray.setContextMenu(contextMenu)
}

module.exports = {
  createTray
}