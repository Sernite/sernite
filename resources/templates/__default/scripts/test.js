/**
 * This is file is a sernite script.
 * this script invoked when the reqeust that binded this script, came 
 * 
 * This script communicate with sernite stdout and stderr so;
 * Don't use console.* functions such as console.log console.error 
 */

const { sernite } = require('jsernite');


sernite.setHandler(

  /**
   * @param {(msg:string)=>} send : send the message to web client 
   * @param {(name:string,query:string)=>string} nitmsg : send the message to nit given
   *                                                   and returns response 
   */
  async (send, nitmsg) => {

    // you can get params that you defined in sernite.json using just `params`
    // i.e. params[1] will return your first argument.
    let hasAmazingScriptParameters = sernite.params.length !== 0;


    // Get info from db nit
    let resp = await nitmsg('db' /*Nit name*/, 'Hi nit' /*Message*/);
    // And send it to client
    send(resp + "asd")

    // Done function stop execution with or without an error
    if (!hasAmazingScriptParameters) {
      sernite.done('Has no script parameters...');
    }

  }

).run();// then starts the script