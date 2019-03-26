#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');
const appTypes = require('./types.json');
const { scanDir } = require('./dir-worker');
const { exitIfError } = require('./errorHandler');

const appName = process.argv[2];
let appType = process.argv[3];

if (!appName || !appType) {
  console.error('Please provide valide command: est <appName> --<appType>');
  process.exit();
}

appType = appType.slice(2);

if (!appTypes[appType]) {
  console.error(`Application doesn't support ${appType}. You should use ts | js.`);
  process.exit();
}

const templatePath = path.join(__dirname, '../templates', appType);
let appPath = path.join(process.cwd(), appName);

scanDir(templatePath, appPath)
  .then(() => {
    const npm = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
    const command = spawn(npm, ['i'], { cwd: appPath });

    command.stdout.on('data', data => {
      console.log(data.toString());
    });
    command.stderr.on('data', data => {
      exitIfError(data.toString());
    });
  });