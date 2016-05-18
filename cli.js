#!/usr/bin/env node
'use strict';
const meow = require('meow');
const updateNotifier = require('update-notifier');
const skrub = require('skrub');

const cli = meow([
  `Usage
    $ skrub <path|glob> [...]

  Options
    -d, --dry-run  List what would be skrubbed instead of skrubbing

  Examples
    $ skrub unicorn.png rainbow.png
    $ skrub ../beCarefulHere --dry-run`
], {
  string: ['_'],
  boolean: [
    'dry-run'
  ],
  alias: {
    d: 'dry-run'
  }
});

updateNotifier({pkg: cli.pkg, updateCheckInterval: 3600000}).notify();

if (process.platform === 'win32') {
  console.error(`Windows is not yet supported.
    Flags are not parsed the same way from the command line in Windows.
    Try out cmder or a Virtual Machine.`);
  process.exit(1);
}

if (cli.input.length === 0) {
  console.error('Specify at least one path');
  process.exit(1);
}

skrub(cli.input, cli.flags)
  .then(files => {
    // console.log('cli.input: ', cli.input);
    // console.log('cli.flags: ', cli.flags);
    if (cli.flags.dryRun) {
      console.log(files.join('\n'));
    }
  });
