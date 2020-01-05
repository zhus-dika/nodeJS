const fs = require('fs');
const path = require('path');
var util = require('util');
const readFiles = require('../readFiles');
module.exports = (base, newDir) => {
    var files = readFiles(base, 0);
    /****create new dir for files***/
    const mkdir = util.promisify(fs.mkdir);
    if (!fs.existsSync(newDir)) {
        mkdir(newDir).then((result)=>{
            console.log(newDir + ' dir created')
        }).catch((error) => {
            console.log(error)
        });
    }
    /**************** arrangment file objects *******************/
    files.forEach(item => { 
        let nameDir = path.join(newDir, path.basename(item).substr(0,1).toUpperCase());
        /****create new dir for sorting files ***/
        if (!fs.existsSync(nameDir)) {
            fs.mkdirSync(nameDir, function (err) {
                if (err) console.error(err);
                    });
        }
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