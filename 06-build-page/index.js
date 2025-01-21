/**
 *  Please check this task a bit later. I would like to finish. I'm working on it right now. 
 *  Thank you for your understanding!
 */

const fs = require('fs');
const path = require('path');
const { readdir, readFile, writeFile, rm, copyFile, appendFile, stat, mkdir } = require('node:fs/promises');

const projectDistName = 'project-dist';
const projectDistPath = path.join(__dirname, projectDistName);
const cssDistPath = path.join(__dirname, projectDistName, 'style.css');
const cssExtantion = '.css';

async function createHtml() {
  try {
    const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8');
    const files = await readdir(path.join(__dirname, 'components'), {withFileTypes: true});
    let htmlTemplate = await readFile(path.join(__dirname, 'template.html'),'utf-8');
    for (const file of files) {
      const component = await readFile(path.join(path.join(__dirname, 'components'), file.name), 'utf-8');
      // console.log(component);
      const componentToReplace = new RegExp(`{{${file.name.split('.').slice(0, 1).join(' ')}}}`);
      htmlTemplate = htmlTemplate.replace(componentToReplace, component.toString());
    }
    // const re = /apples/gi;
    // const str = "Apples are round, and apples are juicy.";
    // const newstr = str.replace(re, "oranges");
    // console.log(newstr); // oranges are round, and oranges are juicy.
    writeStream.write(`${htmlTemplate}\n`);
  } catch (error) {
    console.error('createHtml', error);
  }
}
// createHtml();
async function copyAssetsFiles(sourceDirPath, outputDirPath) {
  const files = await readdir(sourceDirPath, {withFileTypes: true});
  for (const file of files) {
    if (file.isDirectory()) {
      // const filesInsideAssetsFolder = await readdir(path.join(path.join(__dirname, 'assets'), file.name), {withFileTypes: true});
      await mkdir(path.join(outputDirPath, file.name));
      await copyAssetsFiles(path.join(sourceDirPath, file.name), path.join(outputDirPath, file.name));
      // for (const item of filesInsideAssetsFolder) {
      //   await copyFile(path.join(path.join(__dirname, 'assets'), item.name), path.join(path.join(projectDistPath, 'assets'), file.name));
      // }
    } else if (file.isFile()) {
      await copyFile(path.join(sourceDirPath, file.name), path.join(outputDirPath, file.name));
      
    } else {
      console.log('lol');
    }
  }
}
async function createDirectory(sourceDirPath, outputDirPath) {
  // console.log(sourceDirPath)
  // console.log(outputDirPath)
  try {
    await rm(outputDirPath, {recursive: true, force: true});
    await mkdir(outputDirPath, {recursive: true});
    // copy assets files here
    copyAssetsFiles(sourceDirPath, outputDirPath);
    console.log('Assets directory is created');
    console.log('Assets files are copied');
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
    await createDirectory(path.join(__dirname, 'assets'), path.join(projectDistPath, 'assets'));
    await createStyles();
    await createHtml();
  } catch (error) {
    console.error('buildProject', error);
  }
}
buildProject();