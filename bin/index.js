#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');
const appTypes = require('./types.json');
const { scanDir } = require('./dir-worker');
const { exitIfError } = require('./errorHandler');

const appName = process.argv[2];
let appType = process.argv[3];

if (!appName) {
  exitIfError('Please provide valide command: est <AppName> [--<AppType>]');
}

if (!appType) {
  appType = '--js';
}

if (!appTypes[appType]) {
  exitIfError(`Application doesn't support ${appType}. You should use --ts | --js.`);
}

const templatePath = path.join(__dirname, '../templates', appTypes[appType]);
let appPath = path.join(process.cwd(), appName);

scanDir(templatePath, appPath)
  .then(() => {
    const npm = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
    const command = spawn(npm, ['i'], { cwd: appPath });

    command.stdout.on('data', data => {
      console.log(data.toString());
    });
    command.on('close', () => {
      console.log(`
        Instalation completed!

        cd ${appName}
        npm start
      `);
    });
  });