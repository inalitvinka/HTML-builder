const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const { readdir, stat } = require('node:fs/promises');

const pathToDir = path.join(__dirname, 'secret-folder');
fs.readdir(pathToDir, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err.message);
  }
  const toLog = files.filter(file => file.isFile());
  toLog.forEach(showInfo);
  // files.forEach((file) => {
  //   if (file.isFile()) console.log(file.name);
  // })
})

function showInfo(file) {
  const filePath = path.join(pathToDir, file.name);
  fs.stat(filePath, filePath, (er, stats) => {
    if (er) {
      console.error(er.message);
    }
    console.log(file.name.split('.'));
  })
}