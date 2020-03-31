const log = require('../logger');
const path = require('path');
const fs = require('fs');
const { getClassInfoText } = require('./infoText');
const { requiredQuestion, writeFileSync } = require('./util');


module.exports = function (option) {
  // Read data from user.
  const url = '/' + requiredQuestion('URL: /');
  const cwd = process.cwd();

  const serniteJSONPath = path.join(cwd, 'sernite.json');
  const serniteJSON = require(serniteJSONPath);

  const emptyPath = path.join(__dirname, '..', '..', 'resources', '__files', 'classes', 'empty.js')
  // Read empty class file
  const emptyClass = fs.readFileSync(emptyPath);
  // Get class info
  const classInfo = getClassInfoText(url)
  // Write 
  let sarr = url.replace(':', '_').split('/');
  writeFileSync(path.join(cwd, 'classes',
    ...sarr.slice(0, -1),
    sarr.slice(-1)[0] + '.js'),
    classInfo + emptyClass);

  // Update sernite.json
  serniteJSON.classes = serniteJSON.classes || [];
  serniteJSON.classes.push(url);
  fs.writeFileSync(path.join(cwd, 'sernite.json'), JSON.stringify(serniteJSON, null, 4));

  log('class created!');

}
