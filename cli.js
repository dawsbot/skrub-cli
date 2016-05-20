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
    -i, --iterations  Write over the file multiple times (defaults to one)

  Examples
    $ skrub unicorn.png rainbow.png
    $ skrub '../*' '!../thatSuperImportantThing.txt'
    $ skrub /beCarefulHere --dry-run
    $ skrub extraSkrubbed.txt --iterations 36`
], {
  string: ['_'],
  boolean: [
    'dry-run'
  ],
  alias: {
    d: 'dry-run',
    i: 'iterations'
  }
});

updateNotifier({pkg: cli.pkg, updateCheckInterval: 3600000}).notify();

if (cli.input.length === 0) {
  console.error('Specify at least one path');
  process.exit(1);
}

skrub(cli.input, cli.flags)
  .then(files => {
    if (cli.flags.dryRun) {
      console.log(files.join('\n'));
    }
    if (cli.flags.iterations) {
      console.log(`written over ${cli.flags.iterations} times`);
    }
  });
