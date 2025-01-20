const path = require('path');
const { readdir, readFile, appendFile, stat, mkdir, rm, copyFile } = require('node:fs/promises');
const { stdout } = require('process');

const rootDirPath = path.join(__dirname, 'styles');
const destDirPath = path.join(__dirname, 'project-dist', 'bundle.css');
const requiredExtantion = '.css';

async function mergeStyles() {
  try {
    const allFiles = await readdir(rootDirPath, {withFileTypes: true});
    const cssfiles = allFiles.filter(file => file.isFile() && file.name.slice(-4) === requiredExtantion);
    console.log(cssfiles);
    for (const file of cssfiles) {
      const filesContent = await readFile(path.join(rootDirPath, file.name), 'utf-8');
      await appendFile(destDirPath, filesContent);
    }
    stdout.write('Bundle is created');
  } catch (error) {
    console.error(error);
  }
}
mergeStyles();