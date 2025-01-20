const fs = require('fs');
const path = require('path');
const { readdir, readFile, stat, mkdir, rm, copyFile } = require('node:fs/promises');

const rootDirPath = path.join(__dirname, 'styles');
const destDirPath = path.join(__dirname, 'project-dist', 'bundle.css');
const requiredExtantion = '.css';

async function mergeStyles() {
  try {
    const writeStream = fs.createWriteStream(destDirPath, 'utf-8');
    const allFiles = await readdir(rootDirPath, {withFileTypes: true});
    // console.log(typeof allFiles[0])
    // console.log(path.extname(allFiles[0]))
    const files = allFiles.filter(file => file.isFile() && path.extname(file.name) === requiredExtantion);
    console.log(files)
  } catch (error) {
    console.error(error);
  }

}
mergeStyles();