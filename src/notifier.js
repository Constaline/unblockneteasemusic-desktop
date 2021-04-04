const { app, dialog, nativeImage } = require('electron');
const notifier = require('node-notifier');
const path = require('path')

let icon = nativeImage.createFromPath(global.ICON_PATH.common)

const showDialog = ({ message }) => {
  return dialog.showMessageBox({
    title: global.appInfo.name,
    message,
    icon
  })
}

const showNotification = ({ message }) => {
  if (!app.isPackaged) { return; }
  return notifier.notify({
    title: global.appInfo.name,
    message,
    icon: path.join(global.ROOT_PATH, '../assets/notifer.png'),  // not to pack in asar
    sound: false,
    appName: global.appInfo.name,
    wait: true
  });
}

module.exports = {
  showDialog,
  showNotification
}

