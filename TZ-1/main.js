//node main.js --sourceDir ./test --targetDir ./new --delete
const fs = require('fs');
const arrangmentFiles = require('./arrangmentFiles');
const deleteDirRec = require('./deleteDirRec');
let sourceDir = './test'; //default value
let targetDir = './new'; //default value
let i = 2;
let argv = process.argv[i];
var flag = false;
while (argv) {
    switch (argv) {
        case '--sourceDir': 
        if(fs.existsSync(process.argv[i + 1])) {
            sourceDir = process.argv[i + 1];
        } else {
            console.log(process.argv[i + 1] + " isn't exist");
            flag = true;
        }
        i += 2;
        break;
        case '--targetDir': targetDir = process.argv[i + 1];
        i += 2;
        break;
        case '--delete': deleteDirRec(sourceDir);
        i++;
        break;
        default: 
        console.log('incorrect parameter');
        flag = true;
        break;
    }
    if (flag) break;
    argv = process.argv[i];
}
arrangmentFiles(sourceDir, targetDir);





