#!/usr/bin/env node
/**
 *  @author Ahmetcan ÖZCAN <ahmetcanozcan7@gmail.com>
 * 
 * @description Sernite Script, is the script executer module for sernite projects.
 * 
 */


const readline = require('readline');
const path = require('path')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const getLine = (function () {
  const getLineGen = (async function* () {
    for await (const line of rl) {
      yield line;
    }
  })();
  return async () => ((await getLineGen.next()).value);
})();

/**
 * Send message to the given nit and wait for its response and return it.
 * using in async functions is recommended.
 * @param {string} name of the target nit
 * @param {string} message of the script
 * @returns {string} response of the nit
 */
async function nitmsg(name, message) {
  const m = `nit;;;${name};;;${message}\n`;
  console.error(m);
  const resp = await getLine() // Wait for nit response
  return resp;
}

/**
 * Send message to web client
 * @param {string} message the message will be sent to client.
 */
function send(message) {
  console.log(message);
}

// Setting up process.env to params array and set it global variable
(function () {
  let argv = process.argv.slice(3);
  global.params = argv;
})();

// Setting up the done function to global scope
(function () {
  /**
   * Exit the process
   * @param {string|number} msg error message or code
   */
  function done(msg = false) {
    if (!msg) {
      return process.exit();
    }
    if (typeof msg == 'string') {
      const errMsg = `err;;;1;;;${msg}`;
      console.error(errMsg);
      return process.exit(1);
    }
    if (typeof msg == 'number') {
      return process.exit(msg);
    }
  }

  global.done = done;


})()

// import function then run it;
const scriptPath = path.join(process.cwd(), process.argv[2]);
const f = require(scriptPath);
f(send, nitmsg)

