const log = require('../logger');
const path = require('path');
const fs = require('fs');
const { getNitInfoText } = require('./infoText');
const { requiredQuestion } = require('./util');


module.exports = function (option) {
  // Read data from user.
  const name = requiredQuestion('Name: ');
  const filePath = 'nits/' + requiredQuestion('Path: nits/')
  const emptyPath = path.join(__dirname, '..', '..', 'resources', '__files', 'nits', 'empty.js');
  const cwd = process.cwd();

  const serniteJSONPath = path.join(cwd, 'sernite.json');
  const serniteJSON = require(serniteJSONPath);

  // Get nit's file extention
  const fileExtention = filePath.split('.').slice(-1)[0];
  // if extention is not js, return error
  if (fileExtention != 'js') {
    return log.error('Nit file must be javascript');
  }

  // Check nit name is taken or not. 
  for (const ind in serniteJSON.nits) {
    const nit = serniteJSON.nits[ind];
    // If its taken throw an error.
    if (nit.name == name) {
      return log.error('name allready taken.');
    }
    if (nit.path == filePath) {
      return log.error('path allready taken.');
    }
  }

  // Read empty nit file
  const emptyNit = fs.readFileSync(emptyPath);
  // Get nit info
  const nitInfo = getNitInfoText(filePath, name)
  // Write 
  fs.writeFileSync(path.join(cwd, ...filePath.split('/')), nitInfo + emptyNit);

  // Update sernite.json
  serniteJSON.nits.push({
    name: name,
    path: filePath
  });
  fs.writeFileSync(path.join(cwd, 'sernite.json'), JSON.stringify(serniteJSON, null, 4));

  log('nit created!');

}
