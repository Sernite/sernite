const pparser = require('./paramParser');
const { exec } = require('child_process');
const { EventEmitter } = require('events');
const { NitHandler } = require('./nits');
const log = require('../logger');
const path = require('path');


/**
 * @returns {number} service id
 */
const getServiceID = (
  function () {
    let id = 0;
    return function () {
      id++;
      return id;
    }
  }
)()



/**
 * 
 * @param {{file:string,params:string[],headers:Object<string,string>}} options : 
 * configuration wrapper of header,params and cmd
 * {params} : pure script params.i.e. ["url:echo", "body:username"]
 * {headers} response headers in key value format
 * @returns {Function<Express.Request,Express.Response} handler function for express app
 */
function generateHandlerFunction(options) {
  let { params, headers, path, processTimeout } = options;
  processTimeout = processTimeout || 5000;
  const runnerCMD = getRunnerCommand(
    path.split('.').slice(-1)[0],
    path
  )
  return function (req, res) {
    // Parse params
    pparams = pparser.parseParams(req, params)
    // Set reponse headers
    res.set(headers)

    const cmd = `${runnerCMD} ${pparams.join(' ')}`;
    log.debug('Running :' + cmd);
    const childP = exec(cmd, {
      timeout: processTimeout,
      cwd: process.cwd(),
    }, function (err, stdout, stderr) {
    });
    childP.stdout.pipe(res);

    childP.stderr.on('data', function (line) {
      const [tag, iden, message] = line.split(';;;');
      log.debug(line);
      if (tag == "err") {
        log.error(`${message} from ${file}`);
      } else if (tag == "nit") {
        NitHandler.get(iden).send(message)
          .then(result => {
            childP.stdin.write(result + '\n');
          });
      }
    });


  }

}

function getRunnerCommand(ext, filepath) {
  switch (ext) {
    case 'js':
      return 'node ' + filepath
    case 'exe':
      return (process.cwd() + "/" + filepath).replace('/', '\\') + "  ";
    default:
      return ''
  }
}

module.exports = { generate: generateHandlerFunction };