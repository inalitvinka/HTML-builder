// const fs = require('fs/promises');
const path = require('path');
const { readdir, stat, mkdir, rm, copyFile } = require('node:fs/promises');

const rootDirPath = path.join(__dirname, 'files');
const copyDirPath = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await rm(copyDirPath, {recursive: true, force: true});
    await mkdir(copyDirPath, {recursive: true});
    (await readdir(rootDirPath, {withFileTypes: false})).forEach(file => {
      const rootFilePath = path.join(rootDirPath, file);
      const copyFilePath = path.join(copyDirPath, file);
      copyFile(rootFilePath, copyFilePath);
      // copyFile(path.join(rootDirPath, file), path.join(copyDirPath, file));
    })
  } catch (error) {
    console.error(error);
  }
}
copyDir();