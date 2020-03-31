const express = require('express');
const path = require('path');
const fs = require('fs');
const handlerFunction = require('./handlerFunction');
const { NitHandler } = require('./nits');
const emoji = require('../emojis');
const log = require('../logger');
const { buildBondedScripts } = require('./binding');
/**
 * 
 * @param {{port:string|number,debug:boolean}} options :  configurations for sernite app
 */
function start(options) {
  const { port, debug } = options;
  log.setDebugMode(debug);
  // instantiate express app
  const app = express();
  // Read sernite.json from cwd
  const cwd = process.cwd();
  const sernitePath = path.join(cwd, 'sernite.json');
  const serniteJSON = require(sernitePath);

  // Set nits 
  for (const nitIndex in serniteJSON.nits) {
    const nit = serniteJSON.nits[nitIndex];
    const filepath = path.join(cwd, nit.path)
    new NitHandler(nit.name, filepath);
    log.debug(`Nit:${nit.name} created.`);

  }
  // Build  bindings
  if (buildBondedScripts(serniteJSON.bindings || [])) {
    return log.error('Can not build bonded scripts')
  }

  // Set middlewares
  if (serniteJSON.middleware) {
    // Import middleware function or array.
    const middlewareImport = require(path.join(cwd, serniteJSON.middleware));
    // if it's a function, pass express.Application to middlewareFunction.
    if (typeof middlewareImport === 'function') {
      middlewareImport(app);
      // if it's an array, add all middlewares to expres app from that array
    } else if (typeof middlewareImport == 'object') {
      for (const ind in middlewareImport) {
        app.use(middlewareImport[ind]);
      }
    } else {
      log.error('missing middleware export');
    }
    log.debug('Middlewares added');
  }

  // Setting sernite classes
  if (serniteJSON.classes) {

    for (const ind in serniteJSON.classes) {
      let clurl = serniteJSON.classes[ind] || "";
      let p = process.cwd() +
        path.sep +
        'classes' +
        path.sep +
        clurl.replace(':', '_').split('/').join(path.sep) + '.js';
      let clCons = require(p);
      let cl = new clCons();
      ['get', 'post', 'put', 'delete'].forEach(m => {
        if (cl[m]) {
          app[m](clurl, cl[m]);
        }
      });
      log.debug(`Class for ${clurl},  created.`)
    }

  }

  // Setting routes
  for (const routeIndex in serniteJSON.scripts) {
    const route = serniteJSON.scripts[routeIndex];
    let methods = route.methods;
    if (!methods) {
      methods = ['GET']
    }
    const url = route.url;
    const handler = handlerFunction.generate(route);
    for (const index in methods) {
      let method = methods[index];
      let me = method.toLowerCase();
      app[me](url, handler);
    }

  }

  app.listen(port, () => {
    const msg = `Started on  http://localhost:${port} ${emoji.rocket}${emoji.rocket}`;
    log(msg);
  });

}

module.exports = { start };