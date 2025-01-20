const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const { readdir, stat, mkdir } = require('node:fs/promises');

const rootDirPath = path.join(__dirname, 'files');
const copyDirPath = path.join(__dirname, 'files-copy');
// const copyDir = () => {

// }
const makeNewDir = () => {
  fs.mkdir(copyDirPath, 
    {recursive: false},
    (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Dir is created');
  }); 
}
makeNewDir();