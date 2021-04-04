const { app } = require('electron')
const fse = require('fs-extra')
const path = require('path')

const appQuit = () => {
  console.log('App Quit')
  app.quit()
}

const appRelaunch = () => {
  console.log('App Relaunch')
  app.relaunch({ args: process.argv.slice(1) + ['--relaunch'] })
  app.exit(0)
}

const removeConfigFile = () => {
  let filePath = path.join(global.USERDATA_PATH, 'config.json')
  try {
    fse.removeSync(filePath);
    console.log('removeConfigFile success')
    appRelaunch()
  } catch (e) {
    console.log('removeConfigFile ERROR:', e)
    appQuit()
  }
}

module.exports = {
  appQuit,
  appRelaunch,
  removeConfigFile
}