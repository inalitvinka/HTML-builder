const fs = require('fs');
const path = require('path');
const { readdir, readFile, writeFile, appendFile, stat, mkdir } = require('node:fs/promises');
const { stdout } = require('process');

const rootDirPath = path.join(__dirname, 'styles');
const destDirPath = path.join(__dirname, 'project-dist', 'bundle.css');
const requiredExtantion = '.css';
const stylesToMerge = [];

async function mergeStyles() {
  try {
    const writeStream = fs.createWriteStream(destDirPath, 'utf-8');
    const allFiles = await readdir(rootDirPath, {withFileTypes: true});
    const cssfiles = allFiles.filter(file => file.isFile() && file.name.slice(-4) === requiredExtantion);
    for (const file of cssfiles) {
      const stylesContent = await readFile(path.join(rootDirPath, file.name), 'utf-8');
      stylesToMerge.push(stylesContent);
      // writeStream.write(`${stylesContent}\n`);
    }
    writeStream.write(`${stylesToMerge.join('\n')}\n`);
    // await writeFile(path.join(destDirPath, 'bundle.css'), stylesToMerge.join(' '),
    // );
    stdout.write('Bundle is created');
  } catch (error) {
    console.error(error);
  }
}
mergeStyles();