const fs = require('fs');
const path = require('path');
module.exports = (base, level) => {
  const files = fs.readdirSync(base);
  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);
    if (state.isDirectory()) {
      var innerFiles = fs.readdirSync(item);
      if (!innerFiles.length) {
          console.log('hello');
        /*fs.rmdir(item, err => {
            if (err) {
              console.log(err);
              return;
            }
            console.log('Delete done!');
          });*/
      }
      module.exports(localBase, level + 1);
    } else {
        fs.unlinkSync(localBase);
    }
  });
}


