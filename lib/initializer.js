const readline = require('readline-sync');
const path = require('path');
const chalk = require('chalk');
const { ncp } = require('ncp');
const fs = require('fs');
const { exec, execSync } = require('child_process');
const { thumpsUp, okeyFinger, hearts } = require('./emojis');
const log = require('./logger');


function throwInitializingError() {
  log.error(`Project not initialized...`);
  process.exit(1);
}

function doneInitiliazing() {
  log(`Initialized sernite correctly...${thumpsUp}${okeyFinger}`);
}


/**
 * @param {Object} options : configurations of initialization. 
 * @returns {void} 
 */
function initialize(options) {
  log(`After ${chalk.yellow('few')} steps, sernite will be ready.`)

  const template = options.template || '__default'
  const templatePath = path.join(__dirname, '..', 'resources', 'templates', template)

  const serniteJSON = require(path.join(templatePath, 'sernite.json'));
  const templateJSON = require(path.join(templatePath, 'template.json'))
  let cwd = process.cwd()
  let cwdarr = cwd.split(path.sep);
  let cwdDirName = cwdarr[cwdarr.length - 1];

  // Get some info from user.
  serniteJSON.name = readline.question(`Project name(${cwdDirName}) : `) || cwdDirName;
  serniteJSON.author = readline.question("Author : ") || "";

  let resourceDir = templatePath;
  // Copy initial files

  ncp(resourceDir, cwd, function (err) {
    if (err) {
      return throwInitializingError();
    }
    // Delete template.json
    fs.unlinkSync(path.join(cwd, 'template.json'));
    // after copying files, write sernite.json
    fs.writeFileSync(path.join(cwd, 'sernite.json'), JSON.stringify(serniteJSON, null, 4));
    // then initialize npm
    execSync('npm init --yes');
    // after creating package.json read it then modify it 
    // depens on given data from user before.
    let pkgjson = require(path.join(cwd, 'package.json'));
    pkgjson.name = serniteJSON.name;
    pkgjson.author = serniteJSON.author;
    pkgjson.scripts = {
      start: "sernite start"
    }
    // After modification write package.json
    fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(pkgjson, null, 4));
    // then install core dependincies of sernite
    log('installing core dependincies...');
    let npmChild = exec(`npm install --save ${templateJSON.dependencies.join(' ')}`, function (err, sin, sout) {
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