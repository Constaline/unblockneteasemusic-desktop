const {dialog, nativeImage} = require('electron');

let icon = nativeImage.createFromPath(ICON_PATH)

const showDialog = ({ message }) => {
  return dialog.showMessageBox({
    title: global.appInfo.name,
    message,
    icon
  })
}

const notify = ({ message }) => {
  showDialog({ message })
}

module.exports = {
  notify
}

