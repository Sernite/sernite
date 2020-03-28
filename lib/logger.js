const chalk = require('chalk');

let debugMode = false;

/**
 * console.log
 * @param {string} msg 
 */
const log = function (msg) {
  console.log(msg);
}

/**
 * logs message with ``ERR!`` tag
 * @param {string} msg 
 */
log.error = function (msg) {
  console.error(`${chalk.red('ERR!')} ${msg}`);
}
/**
 * logs message with debug tag if debugMode is active.
 * @param {string} msg 
 */
log.debug = function (msg) {
  if (debugMode) {
    console.log(`${chalk.yellow('DEBUG')} ${msg}`);
  }
}

/**
 * @param {string} mode sets debug active or inactive
 */
log.setDebugMode = function (mode) {
  if (mode) {
    debugMode = true;
  } else {
    debugMode = false
  }
}

module.exports = log;



