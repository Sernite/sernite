/**
 * @type {Map<string,NitHandler>} store nithandlers by their names
 */
var nitMap = {}

/**
 * @class 
 * @param {string}  name name of the nit
 * @param {string} filepath `exact` path of the nit 
 */
function NitHandler(name, filepath) {
  nitMap[name] = this; // Add to nithandler to nitMap
  this.handler = require(filepath); // import handler function
}

/**
 * @param {string} name name of the nit
 * @return {NitHandler} NitHandler by given name
 */
NitHandler.get = function (name) {
  const res = nitMap[name];
  return res;
}

/**
 * @param {string} message
 * @returns {Promise<string>}
 */
NitHandler.prototype.send = async function (message) {
  let resp = await this.handler(message)
  // TODO: response would be several type, so it must be converted to string.
  return resp;
}


module.exports = { NitHandler }