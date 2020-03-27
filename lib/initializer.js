const readline = require('readline-sync');
const path = require('path');
const chalk = require('chalk');
const { ncp } = require('ncp');
const fs = require('fs');
const { exec } = require('child_process');
const { thumpsUp, okeyFinger, hearts } = require('./emojis');
var defaultInitJSON = require('./defaultInit.json')

ncp.limit = 16;
chalk.level = chalk.Level.Basic;

function throwInitializingError() {
  console.error(`${chalk.bgRed('ERR! ')}Project not initialized...
  ${chalk.red('exiting with code 1')}`);
  process.exit(1);
}

function doneInitiliazing() {
  console.log(`Initialized sernite correctly...  ${thumpsUp}${okeyFinger}`);
}

/**
 * @returns {void} 
 */
function initialize() {

  console.log(`After ${chalk.yellow('few')} steps, sernite will be ready.`)
  let cwd = process.cwd()
  let cwdarr = cwd.split(path.sep);
  let cwdDirName = cwdarr[cwdarr.length - 1];
  defaultInitJSON.name = readline.question(`Project name(${cwdDirName}) :`) || cwdDirName;
  defaultInitJSON.author = readline.question("Author : ") || "";
  let resourceDir = path.join(__dirname, '..', 'resources');
  ncp(resourceDir, cwd, function (err) {
    if (err) {
      return throwInitializingError();
    }
    fs.writeFileSync(path.join(cwd, 'sernite.json'), JSON.stringify(defaultInitJSON, null, 4));
    doneInitiliazing()

  });



}


module.exports = { initialize };