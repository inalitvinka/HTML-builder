/**
 *  Please check this task a bit later. I would like to finish. I'm working on it right now. 
 *  Thank you for your understanding!
 */

const fs = require('fs');
const path = require('path');
const { readdir, readFile, writeFile, rm, copyFile, appendFile, stat, mkdir } = require('node:fs/promises');

const projectDistName = 'project-dist';
const projectDistPath = path.join(__dirname, projectDistName);
const assetsDirName = 'assets';

const htmlComponentsDir = 'components'; 
const cssSourceDir = 'styles';
const cssDistPath = path.join(__dirname, projectDistName, 'style.css');

const htmlExtantion = '.html';
const cssExtantion = '.css';

async function createDirectory(sourceDirPath, outputDirPath) {
  try {
    await rm(outputDirPath, {recursive: true, force: true});
    await mkdir(outputDirPath, {recursive: true});
    // copy files here
    const files = await readdir(path.join(__dirname, 'assets'), {withFileTypes: true});
    for (const file of files) {
      if (file.isDirectory()) {
        // console.log(path.join(__dirname, file.name));
        const filesInsideAssetsFolder = await readdir(path.join(path.join(__dirname, 'assets'), file.name), {withFileTypes: true});
        // console.log(path.join(path.join(projectDistPath, 'assets'), file.name))
        await mkdir(path.join(path.join(projectDistPath, 'assets'), file.name));
      } else {
        console.log('lol');
      }
    }
    console.log('Directory is created');
  } catch (error) {
    console.error( 'createDirectory', error);
  }
}

async function createStyles() {
  try {
    const writeStream = fs.createWriteStream(cssDistPath, 'utf-8');
    const allFiles = await readdir(path.join(__dirname, 'styles'), {withFileTypes: true});
    const cssfiles = allFiles.filter(file => file.isFile() && file.name.slice(-4) === cssExtantion);
    for (const file of cssfiles) {
      const stylesContent = await readFile(path.join(path.join(__dirname, 'styles'), file.name), 'utf-8');
      writeStream.write(`${stylesContent}\n`);
    }
    console.log('CSS is created');
  } catch (error) {
    console.error('createStyles', error);
  }
}
async function buildProject() {
  try{
    await rm(projectDistPath, {force: true, recursive: true});
    await mkdir(projectDistPath, {recursive: true});

    // createDirectory here
    await createDirectory(path.join(__dirname, 'assets'), path.join(projectDistPath, 'assets'), assetsDirName);
    await createStyles();
  } catch (error) {
    console.error('buildProject', error);
  }
}
buildProject();