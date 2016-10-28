var fs = require('fs');

function scanDir(dir) {
  return fs.readdirSync(dir).filter(ignoreHidden);
}

function ignoreHidden(item) {
  return item[0] != '.';
}

module.exports.scanDir = scanDir;
