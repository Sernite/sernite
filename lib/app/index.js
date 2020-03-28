const express = require('express');
const path = require('path');
const fs = require('fs');
const handlerFunction = require('./handlerFunction');
const { NitHandler } = require('./nits');
const emoji = require('../emojis');
const log = require('../logger');

/**
 * 
 * @param {{port:string|number}} options :  configurations for sernite app
 */
function App(options = { port: 3000 }) {
  let { port } = options;
  port = port || 3000;
  // instantiate express app
  const app = express();
  // Read sernite.json from cwd
  const cwd = process.cwd();
  const sernitePath = path.join(cwd, 'sernite.json');
  const serniteJSON = require(sernitePath);

  // Setting nits 
  for (const nitIndex in serniteJSON.nits) {
    const nit = serniteJSON.nits[nitIndex];
    const filepath = path.join(cwd, nit.path)
    new NitHandler(nit.name, filepath);
  }
  // Setting middlewares
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
      log.error('missing middleware export')
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

module.exports = App;