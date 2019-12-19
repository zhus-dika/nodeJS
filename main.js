//node main.js --sourceDir ./test --targetDir ./new --delete
const fs = require('fs');
const arrangmentFiles = require('./arrangmentFiles');
const deleteDirRec = require('./deleteDirRec');
let sourceDir = './test'; //default value
let targetDir = './new'; //default value
if (process.argv[2] == '--sourceDir' && process.argv[4] == '--targetDir') {
    sourceDir = process.argv[3];
    targetDir = process.argv[5];
}
arrangmentFiles(sourceDir, targetDir);
if (process.argv[6] == '--delete'){
    deleteDirRec(sourceDir);
}






