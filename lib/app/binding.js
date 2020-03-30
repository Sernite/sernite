const { execSync } = require('child_process')
const log = require('../logger');
/**
 * @param {{src :string,dest :stirng}[]} bindings
 * @returns {boolean} if an error occuers returns true otherwise false
 */
function buildBondedScripts(bindings) {
  log('Building bondend scripts...');
  for (var ind in bindings) {
    const binding = bindings[ind];
    // get file extention
    const ext = binding.src.split('.').slice(-1)[0];
    switch (ext) {
      case "go":
        const buildCMD = `go build -o ${binding.dest} ${binding.src}`;
        execSync(buildCMD)
        break;
      default:
        log.error('NOT SUPPORTED EXTENTION:' + ext);
        return true;
    }
  }
  return false;

}

module.exports = { buildBondedScripts }

