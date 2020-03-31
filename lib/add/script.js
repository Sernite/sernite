const readline = require('readline-sync');
const log = require('../logger');
const path = require('path');
const fs = require('fs');
const { thumpsUp, okeyFinger } = require('../emojis');
const { getScriptInfoText } = require('./infoText')
const { writeFileSync } = require('./util');

/**
 * @param {any} opts : Configuration object for adding new scripts
 */
module.exports = function (opts) {
  //Get script info
  const url = '/' + readline.question('Url: /');
  let filePath;
  while (true) {
    filePath = readline.question('Path: scripts/');
    if (!filePath) {
      log('Path can not be empty\n');
    } else {
      filePath = 'scripts/' + filePath;
      break;
    }
  }
  const params = readline.question('Params: ');
  const headers = readline.question('Headers:');

  const scriptObject = {
    url,
    path: filePath,
    params: (() => {
      paramArr = params.split(',').map(p => p.trim());
      if (paramArr.length > 0) {
        return paramArr
      }
      return [];
    })(),
    headers: (() => {
      let resObj = {};
      const pairs = headers.split(',');
      for (const ind in pairs) {
        const pair = pairs[ind];
        const [key, value] = pair.split('=');
        if (key && value) {
          resObj[key.trim()] = value.trim();
        }
      }
      return resObj;
    })(),
  }
  const cwd = process.cwd();
  // Get file extention from path
  const fileExtention = filePath.split('.').slice(-1)[0];
  let emptyFilePath = path.join(__dirname, '..', '..', 'resources', '__files', 'scripts');


  // Update sernite.json
  const serniteJSONPath = path.join(process.cwd(), 'sernite.json');
  const serniteJSON = require(serniteJSONPath);


  switch (fileExtention) {
    case "js":
      emptyFilePath = path.join(emptyFilePath, 'js', 'emptyScript.js');
      break;
    case "go":
      emptyFilePath = path.join(emptyFilePath, 'go', 'emptyScript.go');
      // make bindings
      const bindObject = {
        src: filePath,
        dest: "build/" + (() => filePath.split('.').slice(0, -1).join('.'))() + ".exe"
      }
      scriptObject.path = bindObject.dest;
      serniteJSON.bindings = serniteJSON.bindings || [];
      serniteJSON.bindings.push(bindObject);
      break;
    default:
      return log.error(`Not supported file extention : ${fileExtention}`);
  }

  serniteJSON.scripts = serniteJSON.scripts || []
  //Check file is exist or not.
  for (const ind in serniteJSON.scripts) {
    let script = serniteJSON.scripts[ind];
    if (script.path == scriptObject.path) {
      return log.error('Script already exist : ' + scriptObject.path);
    }
  }

  // Write path
  const emptyFile = fs.readFileSync(emptyFilePath);
  const destPath = path.join(cwd, ...filePath.split('/'));
  const data = getScriptInfoText(fileExtention, scriptObject) + emptyFile
  fs.writeFileSync(destPath, data);


  serniteJSON.scripts.push(scriptObject);
  // And rewrite it 

  fs.writeFileSync(serniteJSONPath, JSON.stringify(serniteJSON, null, 4));
  log(`script created ${thumpsUp}${okeyFinger}`);
}

