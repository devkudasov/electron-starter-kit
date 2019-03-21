#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const appTypes = require('./types.json');

const appName = process.argv[2];
const appType = process.argv[3].slice(2);

if (!appName || !appType) {
  console.error('Please provide valide command: est <appName> --<appType>');
  process.exit();
}

if (!appTypes[appType]) {
  console.error(`Application doesn't support ${appType}. You should use ts | js.`);
  process.exit();
}

const appPath = path.join(process.cwd(), appName);

fs.mkdir(appPath, err => {
  if (err) {
    console.error(err);
    process.exit();
  }

  fs.readdirSync(`./templates/${appType}`).forEach(file => {
    fs.writeFile(path.join(appPath, file), err => {
      if (err) {
        console.error(err);
        process.exit();
      }
    });
  });

  fs.readdirSync(`./templates/${appType}/src`).forEach(file => {
    fs.writeFile(path.join(appPath, file, 'src'), err => {
      if (err) {
        console.error(err);
        process.exit();
      }
    });
  });

  exec(`cd ${appPath} && npm i`, err => {
    if (err) {
      console.error(err);
      process.exit();
    }
  });
});