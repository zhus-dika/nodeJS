const fs = require('fs');
const path = require('path');
const readFiles = require('../readFiles');
module.exports = (base) => {
    var files = readFiles(base, 0);
    if (!fs.existsSync('./temp')) {
        fs.mkdirSync('./temp');
    }
    files.sort();
    var nameDir;
    files.forEach(item => { 
        nameDir = `./temp/${(item.substr(0, 1))}`; 
        if (!fs.existsSync(nameDir)) {
            fs.mkdirSync(nameDir);
        }
        let pathFile = `./temp/${(item.substr(0, 1))}/${item}`;
        if (!fs.existsSync(pathFile)) {
            fs.link(item, pathFile, err => {
                if (err) {
                    console.error(err.message);
                    return;
                }
            });
        }
    });
    console.log(nameDir);  
}


