const path = require('path');
const cwd = process.cwd();
const paths = {
  serniteJSON: path.join(cwd, 'sernite.json'),
  __files: path.join(__dirname, '..', 'resources', '__files')


}

module.exports = {
  paths,
}


