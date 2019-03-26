const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const { exitIfError } = require('./errorHandler');

const fsMkdir = promisify(fs.mkdir);
const fsReaddir = promisify(fs.readdir);
const fsExists = promisify(fs.exists);

function createDir(dirPath) {
  return fsExists(dirPath)
    .then(isExists => {
      if (!isExists) {
        console.log(`Create directory ${dirPath}`);
        return fsMkdir(dirPath);
      } else {
        throw ('Directory already exists! Please use different name!');
      }
    });
}

function scanDir(templatePath, appPath) {
  return createDir(appPath)
    .then(() => {
      return fsReaddir(templatePath);
    })
    .then(files => {
      files.forEach(file => {
        const dataPath = path.join(templatePath, file);
        const filePath = path.join(appPath, file);

        if (fs.lstatSync(dataPath).isDirectory()) {
          scanDir(dataPath, filePath);
        } else {
          copyFile(dataPath, filePath);
        }
      });

      return true;
    })
    .catch(exitIfError);
}

function copyFile(templatePath, appPath) {
  console.log(`Copy file ${appPath}`);
  fs.copyFileSync(templatePath, appPath);
}

exports.scanDir = scanDir;