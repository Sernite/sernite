const readline = require('readline-sync');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

function writeFileSync(p, ctx) {
  mkdirp.sync(path.dirname(p));
  fs.writeFileSync(p, ctx);
}

function requiredQuestion(disp) {
  let name = "";
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


module.exports = { requiredQuestion, writeFileSync }