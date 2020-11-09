const log4js = require('log4js');
const path = require('path');

let logFilePath = path.join(global.LOG_PATH, './app.log')

// log4js config
log4js.configure({
  appenders: {
    console: { type: 'stdout', layout: { type: 'colored' } },
    dateFile: {
      type: 'dateFile',
      filename: logFilePath,
      pattern: 'yyyy_MM_dd',
      alwaysIncludePattern: true,
      compress: true,
      daysToKeep: 7,
      keepFileExt: true
    }
  },
  categories: {
    default: { appenders: ['console', 'dateFile'], level: 'info' }
  }
});

// replace console.log
const logger = log4js.getLogger('console');
console.log = logger.info.bind(logger);
