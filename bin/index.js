#!/usr/bin/env node

const CLI = require('./cli');

const path = require('path');
const { spawn } = require('child_process');
const appTypes = require('./const/types');
const { scanDir } = require('./dir-worker');
const { exitIfError } = require('./errorHandler');

const cli = new CLI(process.argv);

cli.execute();