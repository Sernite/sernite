function initialize(options) {
  const initializer = require('./initializer');
  initializer.initialize(options);
}

function start(options) {
  const app = require('./app');
  app.start(options);
}
module.exports = { start, initialize };