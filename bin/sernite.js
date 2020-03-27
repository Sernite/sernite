#!/usr/bin/env node
const pckg = require('../package.json');
const { program } = require('commander')
const { run, types } = require('../lib');

program.version(pckg.version);

program
  .command('init')
  .action(function () {
    run(types.INIT)
  });

program
  .command('start')
  .option('-p,--port <number>')
  .action(function (opts) {
    run(types.START, opts);
  });

program.parse(process.argv);

