const fs = require('fs');
const path = require('path');
module.exports = (dir) => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file=>{
      var f = path.join(dir, file);
      var state = fs.statSync(f);
      if (state.isDirectory()){
        module.exports(f);
      } else {
        fs.unlinkSync(f);
      }
    });
    fs.rmdir(dir, err=> {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  }
}


