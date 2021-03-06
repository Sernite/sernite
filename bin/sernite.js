#!/usr/bin/env node
const pckg = require('../package.json');
const { program } = require('commander');
const { start, initialize } = require('../lib');
const _ = require('lodash');
const add = require('../lib/add');
const log = require('../lib/logger');

program.version(pckg.version);

program
  .command('init')
  .option('-t,--template <template>', 'Template name used when initializing.')
  .action(function (options) {
    const cfg = _.pick(options, ['template']);
    initialize(cfg);
  });

program
  .command('start')
  .option('-p,--port <port>', 'Port number that sernite app hosted on.', 3000)
  .option('-d,--debug', 'Logs more information')
  .action(function (options) {
    const cfg = _.pick(options, ['port', 'debug'])
    start(cfg);
  });

program
  .command('add <type>')
  .action(function (type, options) {
    switch (type) {
      case 'script':
        add.script(_.pick(options, ['']));
        break;
      case 'nit':
        add.nit(_.pick(options, ['']))
        break;
      case 'class':
        add.serniteClass(_.pick(options, ['']));
        break;
      default:
        log.error('Cannot add type of ', type);
        break;
    }
  });

program.parse(process.argv);

