const fs = require('fs');
const readFiles = require('./readFiles');
const sortByName = require('./sortByName');
const base = './test';
var files = readFiles(base, 0);
files.forEach(item => { 
    console.log(item);
})
if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp');
}