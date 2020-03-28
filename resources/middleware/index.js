
/**
 * Sets custom middlewares of app
 * @param {Express.Application} app 
 */
module.exports = function (app) {
  /**
   * you can set your middlewares in this scope
   * 
   * app.use(morgan('tiny'));
   * app.use(helmet());
   * 
   */
}

/**
 *
 * middleware script can import an array instead of an funciton
 * module.exports = [
 *    morgan('tiny'),
 *    helmet()
 * ]
 *
 */