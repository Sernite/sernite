/**
 * This is file is a sernite script.
 * this script invoked when the reqeust that binded this script, came 
 * 
 * This script communicate with sernite stdout and stderr so;
 * Don't use console. functions i.e console.log console.error 
 */




/**
 * @param {Function(string)} send : send the message to web client 
 * @param {Function(string,string):string} nitmsg : send the message to nit given
 *                                                   and returns response 
 */
async function handler(send, nitmsg) {

  // you can get params that you defined in sernite.json using just `params`
  // i.e. params[1] will return your first argument.
  let hasAmazingScriptParameters = params.length !== 0;


  // Get info from db nit
  let resp = await nitmsg('db' /*Nit name*/, 'Hi nit' /*Message*/);
  // And send it to client
  send(resp)

  // after script's process are done then
  // you can invoke 'done' function to finalize the script
  if (hasAmazingScriptParameters) {
    done() // if have parameter, exit script normally
  } else {
    done('Has no script parameters...'); // otherwise, exit script with error.
  }

}

// handler function must be exported
module.exports = handler;