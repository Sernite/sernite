
const morgan = require('morgan');

// middleware script can import an array 
module.exports = [
  morgan('tiny')
]




/**
* * Sets custom middlewares of app
* * @param {Express.Application} app
* *
* module.exports = function (app) {
*    // you can set your middlewares in this scope
*    app.use(morgan('tiny'));
*    app.use(helmet());
* }
* */




