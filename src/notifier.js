const {app, dialog, nativeImage} = require('electron');
const notifier = require('node-notifier');
const path = require('path')

let icon = nativeImage.createFromPath(ICON_PATH)

const showDialog = ({ message }) => {
  return dialog.showMessageBox({
    title: global.appInfo.name,
    message,
    icon
  })
}

const showNotification = ({ message }) => {
  if(!app.isPackaged) { return; }
  return notifier.notify({
    title: global.appInfo.name,
    message,
    icon: path.join(__dirname, '../../assets/notifer.png'),
    sound: false,
    appName: global.appInfo.name, 
    wait: true
  },);
}

module.exports = {
  showDialog,
  showNotification
}

