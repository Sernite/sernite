#!/usr/bin/env node
const pckg = require('../package.json');
const { program } = require('commander')

program.version(pckg.version);

program
  .option('-i,--init', 'initialize sernite app in this directory.')
  .option('-p, --port', 'set port that will be listening.');

program.parse(process.argv)

require('../lib').run(program.opts());