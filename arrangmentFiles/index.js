const fs = require('fs');
const path = require('path');
var mkdirp = require('mkdirp');
const readFiles = require('../readFiles');
const newDir = './temp';
module.exports = (base) => {
    var files = readFiles(base, 0);
    /****create new dir for files***/
    mkdirp(newDir, function (err) {
        if (err) console.error(err);
    });
    /**************** arrangment file objects *******************/
    files.forEach(item => { 
        let nameDir = path.join(newDir, path.basename(item).substr(0,1).toUpperCase());
        /****create new dir for sorting files ***/
        mkdirp(nameDir, function (err) {
            if (err) console.error(err);
                });
        let nextPathFile = path.join(nameDir, path.basename(item));
        if (!fs.existsSync(nextPathFile)) {
            fs.link(item, nextPathFile , err => {
                if (err) {
                    console.error(err.message);
                    return;
                }
            });
        }

    });
}