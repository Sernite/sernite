const readline = require('readline-sync');
const emojis = require('../emojis');
const log = require('../logger');


module.exports = function (option) {
  // Read data from user.
  const name = requiredQuestion('Name');
  const path = requiredQuestion('Path', 'Path: nits/')
  // TODO: create a nit depends on given data.

}

function requiredQuestion(name, disp) {
  while (true) {
    name = readline.question(`${disp || (name + ': ')}`);
    if (!name) {
      log.error(`${name} is required`);
    } else {
      break;
    }
  }
  return name;
}