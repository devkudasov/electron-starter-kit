"use strict";

const path = require('path');
const { spawn } = require('child_process');
const appTypes = require('../const/types');
const { scanDir } = require('../dir-worker');
const { exitIfError } = require('../errorHandler');

class Init {
  constructor(params) {
    this._appName = params[0];
    this._appType = params[1];
  }

  _checkAppName() {
    return new Promise((resolve, reject) => {
      if (!this._appName) reject(`You should enter application name`);
      if (!/^[a-zA-Z\-]+$/.test(this._appName)) reject(`Application name can contain only latin letters`);

      resolve();
    });
  }

  _checkAppType() {
    return new Promise((resolve, reject) => {
      if (!this._appType) {
        this._appType = '--js';
      }

      if (!appTypes[this._appType]) {
        reject(`
Application doesn't support ${this._appType}. You should use one of types below:
${Object.keys(appTypes).join('\n')}`);
      }

      resolve();
    });
  }

  _createApp() {
    const $templatePath = path.join(__dirname, '../../templates', appTypes[this._appType]);
    let $appPath = path.join(process.cwd(), this._appName);

    return new Promise(resolve => {
      scanDir($templatePath, $appPath)
        .then(() => {
          const $npm = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
          const $command = spawn($npm, ['i'], { cwd: $appPath });

          $command.stdout.on('data', __data => {
            console.log(__data.toString());
          });
          $command.on('close', () => {
            console.log(`
Instalation completed!

cd ${this._appName}
npm start`);

            resolve();
          });
        });
    });
  }

  execute() {
    return this._checkAppName()
      .then(() => this._checkAppType())
      .then(() => this._createApp())
      .catch(exitIfError);
  }
}

module.exports = Init;