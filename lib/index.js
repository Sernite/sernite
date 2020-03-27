/**
 * @enum {number} 
 */
const types = {
  INIT: 0,
  START: 1,
};

/**
 * @param {} type : type of process. i.e. start | init
 * @param {Object} options : app configurations with key pair format
 */
function handler(type, options) {
  if (type === types.INIT) {
    require('./initializer').initialize();
  } else if (type == types.START) {
    const app = require('./app');
    app(options);
  }

}

module.exports = { run: handler, types };