const fs = require('fs');
const path = require('path');
const base = '../test';
var allFiles = [];
module.exports = (base, level) => {
  const files = fs.readdirSync(base);
  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);
    if (state.isDirectory()) {
      module.exports(localBase, level + 1);
    } else {
      allFiles.push(localBase);
    }
  })
  return allFiles;
}


