/**
 * this file is a sernite nit.
 * unlike scripts, nits work continuously 
 * 
 * Unlike scripts, nits are native part of the project
 * 
 */


/**
 * 
 * @param {string} query : message came from a service
 * @returns {any} response of nit 
 */
async function handler(query) {

  /**
   *  Unlike scripts, you can use console.* functions 
   */
  console.log('DB service got:', query);

  return 'Greeting, from db nit';
}

module.exports = handler