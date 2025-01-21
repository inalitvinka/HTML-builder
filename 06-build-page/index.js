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
    await createDirectory(assetsDirName);
    await createStyles();
  } catch (error) {
    console.error('buildProject', error);
  }
}
async function createDirectory(outputDirPath) {
  try {
    await rm(outputDirPath, {recursive: true, force: true});
    await mkdir(outputDirPath, {recursive: true});
    // copy files here
    console.log('Directory is created');
  } catch (error) {
    console.error( 'createDirectory', error);
  }
}
buildProject();