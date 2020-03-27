
/**
 * @param {Express.Request} req express request
 * @param {string[]} params  strings from sernitejson. i.e. "url:echo" , "body:password"
 * @returns {string[]} parsed params. 
 */
function parseParams(req, params) {
  let result = [];
  for (const ind in params) {
    let param = params[ind];
    let temp = param;
    if (param.startsWith('url:')) {
      const qu = param.slice(4);
      temp = req.params[qu]
    } else if (param.startsWith('body:')) {
      const qu = param.slice(5);
      temp = req.body[qu];
    }
    result.push(temp);
  }
  return result;
}

module.exports = { parseParams }