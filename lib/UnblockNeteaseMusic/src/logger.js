// const pino = require('pino');

// The destination of the log file. Can be `undefined`.
// const destFile = process.env.LOG_FILE;

// Do not colorize if printing to non-TTY deivce.
// const colorize = process.stdout.isTTY;
// const messageFormat = colorize
// 	? '\x1b[1m\x1b[32m({scope})\x1b[0m\x1b[36m {msg}'
// 	: '({scope}) {msg}';

// const logger = pino(
// 	{
// 		level: process.env.LOG_LEVEL ?? 'info',
// 		prettyPrint:
// 			process.env.JSON_LOG === 'true'
// 				? false
// 				: {
// 						colorize: colorize,
// 						messageFormat: messageFormat,
// 						ignore: 'time,pid,hostname,scope',
// 						errorProps: '*',
// 				  },
// 	},
// 	// Redirect the logs to destFile if specified.
// 	destFile && pino.destination(destFile)
// );

// 暂时性重写logger方法，规避打包exe后出现的EBADF错误
// Error: EBADF: bad file descriptor, write
// https://github.com/pinojs/pino/issues/710
let _loggerFunc = (_log, _desc) => {
	_desc && console.log(_desc)
	_log && console.log(_log)
};
let _loggerType = ["silent", "trace", "debug", "info", "warn", "error", "fatal"];
let logger = {};
_loggerType.forEach(type => {
	logger[type] = _loggerFunc;
});

/**
 * Add the scope of this log message.
 *
 * @param {string} scope The scope of this log message.
 * @return {pino.Logger}
 */
function logScope(scope) {
	// return logger.child({
	// 	scope,
	// });

	return logger;
}

module.exports = {
	logger,
	logScope,
};
