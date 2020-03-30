/**
 * @enum
 */
const langs = {
  JS: 0
}
/**
 * 
 * @param {number} lang enum value of language. JS : 0 ; 
 * @param {any} obj script object 
 */
function getScriptInfoText(lang = 0, obj) {
  if (lang == langs.JS) {
    return `
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

  }
}

module.exports = { getScriptInfoText, langs }