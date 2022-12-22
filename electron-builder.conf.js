module.exports = {
  "productName": "UnblockNeteaseMusic",
  "appId": "com.unblockneteasemusic.desktop",
  "asar": {
    "smartUnpack": false
  },
  "asarUnpack": [
    "node_modules/node-notifier/vendor/**"
  ],
  "extraResources": [
    "assets/notifer.png"
  ],
  "directories": {
    "output": "dist"
  },
  // Include "lib/UnblockNeteaseMusic/node_modules" in asar
  // "includeSubNodeModules": true,
  "dmg": {
    "contents": [
      {
        "x": 410,
        "y": 150,
        "type": "link",
        "path": "/Applications"
      },
      {
        "x": 130,
        "y": 150,
        "type": "file"
      }
    ]
  },
  "mac": {
    "icon": "assets/icon.png"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "perMachine": true,
    "runAfterFinish": true,
    "allowElevation": true,
    "artifactName": "${name}-${version}.${ext}",
    "createDesktopShortcut": false
  },
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": [
          "ia32"
        ]
      }
    ],
    "icon": "assets/icon.png"
  }
}