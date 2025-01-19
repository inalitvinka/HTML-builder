const fs = require('fs');
const path = require('path');
const process = require('process');
const lineReader = require('readline');

const rl = lineReader.createInterface({input: process.stdin, output: process.stdout});
const farewell = 'See you later!';
const greeting = 'Hi there!\nType your text here, please!\n'

const closeProgram = () => {
  rl.close();
  process.stdout.write(farewell);
}

const pathToFile = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(pathToFile, 'utf-8');

const handleData = (data) => {
  if (data === 'exit') {
    closeProgram();
  } else {
    writeStream.write(`${data}\n`);
  }
}
rl.write(greeting);
rl.on('SIGINT', closeProgram);
rl.on('line', handleData);