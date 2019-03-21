#!/usr/bin/env node

const fs = require('fs');
const appTypes = require('./types.json');

const appName = process.argv[2];
const appType = process.argv[3];

if (!appName || !appType) {
  console.error('Please provide valide command: est <appName> --<appType>');
}

console.log(process.argv);