const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const pathToDir = path.join(__dirname, 'secret-folder');
fs.readdir(pathToDir, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err.message);
  }
  const toLog = files.filter(file => file.isFile());
  toLog.forEach(showInfo);
})

function showInfo(file) {
  const filePath = path.join(pathToDir, file.name);
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.log(err.message);
    }
    const filesArr = file.name.split('.');
    filesArr.push(`${(stats.size / 1024)}kB`);
    stdout.write(`${filesArr.join(' - ')}\n`);
  })
}