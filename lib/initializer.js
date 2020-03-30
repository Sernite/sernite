const readline = require('readline-sync');
const path = require('path');
const chalk = require('chalk');
const { ncp } = require('ncp');
const fs = require('fs');
const { exec, execSync } = require('child_process');
const { thumpsUp, okeyFinger, hearts } = require('./emojis');
var defaultInitJSON = require('./defaultInit.json')
const log = require('./logger');


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

const coreModuleNames = ['morgan'];

/**
 * @param {Object} options : configurations of initialization. 
 * @returns {void} 
 */
function initialize(options) {
  log(`After ${chalk.yellow('few')} steps, sernite will be ready.`)

  let cwd = process.cwd()
  let cwdarr = cwd.split(path.sep);
  let cwdDirName = cwdarr[cwdarr.length - 1];

  // Get some info from user.
  defaultInitJSON.name = readline.question(`Project name(${cwdDirName}) :`) || cwdDirName;
  defaultInitJSON.author = readline.question("Author : ") || "";

  let resourceDir = path.join(__dirname, '..', 'resources', options.template);
  // Copy initial files
  ncp(resourceDir, cwd, function (err) {
    if (err) {
      return throwInitializingError();
    }
    // after copying files, write sernite.json
    fs.writeFileSync(path.join(cwd, 'sernite.json'), JSON.stringify(defaultInitJSON, null, 4));
    // then initialize npm
    execSync('npm init --yes');
    // after creating package.json read it then modify it 
    // depens on given data from user before.
    let pkgjson = require(path.join(cwd, 'package.json'));
    pkgjson.name = defaultInitJSON.name;
    pkgjson.author = defaultInitJSON.author;
    pkgjson.scripts = {
      start: "sernite start"
    }
    // After modification write package.json
    fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(pkgjson, null, 4));
    // then install core dependincies of sernite
    log('installing core dependincies...');
    let npmChild = exec(`npm install --save ${coreModuleNames.join(' ')}`, function (err, sin, sout) {
      if (err) {
        log.error('Can not install dependincies...')
      }
      doneInitiliazing();
    });
    // Pipe npm install's output stream to main process' output streams
    npmChild.stdout.pipe(process.stdout);
    npmChild.stderr.pipe(process.stderr);


  });



}


module.exports = { initialize };