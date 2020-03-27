![SERNITE](https://ahmetcanozcan.github.io/sernite/img/logo.png)
<br>

[![npm version](https://badge.fury.io/js/sernite.svg)](https://badge.fury.io/js/sernite) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/6c7b66433de24285a07f29386737832d)](https://www.codacy.com/manual/ahmetcanozcan/sernite?utm_source=github.com&utm_medium=referral&utm_content=ahmetcanozcan/sernite&utm_campaign=Badge_Grade) ![NPM](https://img.shields.io/npm/l/sernite)

Sernite is a higher level web framework for more modular and serverless-like server-side scripting.

## Table of Contents

-   [Installation](#Installation)
-   [Getting Started](#getting-started)
-   [Concepts](#Concepts)
    -   [Scripts](#Scripts)
    -   [Nits](#Nits)
-   [Upcoming Features](#upcoming-features)
-   [Contributing](#contributing)
-   [Licence](#license)  

## Installation

Use the  [npm](https://pip.pypa.io/en/stable/) to install sernite.

```bash
$ npm install -g sernite
```

## Getting Started

```bash
$ cd /my/projects/folder # open your favorite project folder
$ mkdir hello_world && cd hello_world # create a folder and open it
$ sernite init  # initialize sernite
$ sernite run  
```

## Concepts

-   ### Scripts

      Sernite scripts are handlers invoked in sub-processes when their assigned request arrived at the Sernite server.
      \\
      scripts are assigned from configuration file
      <br>

    ```json

    // Other configurations..
    "scripts" : [
      {
        "url" : "/echo/:message",
        "path":"scripts/echo.js",
        "params":[
          "url:message",
          "amazingParam"
        ],
        "methods": ["GET"]
      }
    ]
    // Other configurations..

    ```

      echo.js will be invoked when a `GET /echo/:message` request arrived. 
      In sernite scripts, there are two special global variables
      <br>

    -   <span style="font-size:110%">`params`  </span>: an array contains all parsed parameters. An example for `GET /echo/hello` request, params array looks like that `['hello','amazingParam']` 
        <br>

    -   <span style="font-size:110%">`done`  </span>:  a function finalize process with or without an error 
        <br>

        Sernite script have to import a function with two paramaters:
        <br>

    -   <span style="font-size:110%">`send`  </span>: sends your message to web client through `stdout`
        <br>

    -   <span style="font-size:110%">`nitmsg`  </span> : sends your query to the nit and wait for its response and returns
        <br>
        ```javascript
        // scripts/echo.js
        // for GET /echo/hi
        module.exports = async function(send,nitmsg){
          let message = params[0] // hi
          send(message) // send to client `hi`
        }
        ```
        <br>

-   ### Nits
      Nit is a just simple node.js module that exports a function which has two parameters and returns a response.
      <br>
    ```javascript
    module.exports = async function(query){
      let resp = "";
      //some processes...
      return resp;
    }
    ```

## Upcoming Features

-   Multi language support for sernite scripts. considering:
    -   Python
    -   Haskel
    -   Lua
    -   Java

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE)
