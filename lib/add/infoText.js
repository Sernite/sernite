
/**
 * 
 * @param {string} ext file extention of scirpt 
 * @param {any} obj script object 
 */
function getScriptInfoText(ext, obj) {
  if (ext == 'js' || ext == "go") {
    let res = `
/**
 * URL     : ${obj.url}
 * Path    : ${obj.path}
 * Params  : [${obj.params.join(', ')}]
 * Headers : 
 *  
 * 
 * 
 * */
    
 `
    if (ext == "go") {
      res = "package main \n\n" + res
    }
    return res;
  }
}

function getNitInfoText(path, name) {
  const res =
    `/**
 * INFO
 * 
 * Name  : ${name}
 * Path  : ${path}
 * 
 * */
`

  return res;
}

function getClassInfoText(url) {
  const res =
    `
/**
 * URL : ${url}
 * */
`
  return res;
}

module.exports = { getScriptInfoText, getNitInfoText, getClassInfoText }