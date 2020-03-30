![SERNITE](https://sernite.github.io/img/logo.png)
<br>

[![npm version](https://badge.fury.io/js/sernite.svg)](https://badge.fury.io/js/sernite) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b09cbfaf0b7c45b1afea0b9ddccab076)](https://www.codacy.com/manual/ahmetcanozcan/sernite?utm_source=github.com&utm_medium=referral&utm_content=ahmetcanozcan/sernite&utm_campaign=Badge_Grade) ![NPM](https://img.shields.io/npm/l/sernite) ![Website](https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=blue&up_message=online&url=http%3A%2F%2Fsernite.github.io)

Sernite is a higher level web framework for more modular and serverless-like server-side scripting.

## Table of Contents

-   [Installation](#Installation)
-   [Getting Started](#getting-started)
-   [Concepts](#Concepts)
    -   [Scripts](#Scripts)
    -   [Nits](#Nits)
-   [Upcoming Features](#upcoming-features)
-   [Contributing](#contributing)

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

For more detailed tutorial, visit  [webpage](http://sernite.github.io/)

## Concepts

-   ### Scripts

      Sernite scripts are handlers that invoked in sub-processes when their assigned request arrived at the Sernite server.
      \\
      scripts can be assigned from `sernite.json` file
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

    -   <span style="font-size:110%">`params`  </span>: an array contains all parsed parameters. In example; for `GET /echo/hello` request, params array looks like that `['hello','amazingParam']` 
        <br>

    -   <span style="font-size:110%">`done`  </span>:  a function that finalize the process with or without an error 
        <br>

        Sernite scripts must import a function with two paramaters:
        <br>

    -   <span style="font-size:110%">`send`  </span>: sends your message to web client through `stdout`
        <br>

    -   <span style="font-size:110%">`nitmsg`  </span> : sends your query to the nit and waits for its response and returns
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

-   Multiple language support for sernite scripts. considering:
    -   Go
    -   Python
    -   Haskel
    -   Lua
    -   Java

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
