/**
 * 
 * @param {Object} options : app configurations with key pair format
 */
function handler(options) {
  if (options.init) {
    require('./initializer').initialize();
  } else {
    const app = require('./app');
    app(options);
  }

}

module.exports = { run: handler };