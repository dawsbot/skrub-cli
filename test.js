/* eslint xo/no-process-exit: 0 */
const path = require('path');
const fs = require('fs-extra');
const pathExists = require('path-exists');
const tempfile = require('tempfile');
const cliLocation = './cli.js';
const execa = require('execa');

import test from 'ava';

function exists(t, files) {
  [].concat(files).forEach(file => t.true(pathExists.sync(path.join(t.context.tmp, file))));
}

function notExists(t, files) {
  [].concat(files).forEach(file => t.false(pathExists.sync(path.join(t.context.tmp, file))));
}

const fixtures = [
  '1.tmp',
  '2.tmp',
  '3.tmp',
  '4.tmp',
  '.dot.tmp'
];

test.beforeEach(t => {
  t.context.tmp = tempfile();
  fixtures.forEach(fixture => fs.ensureFileSync(path.join(t.context.tmp, fixture)));
});

test('skrub - invalid args', t => {
  t.throws(execa(cliLocation));
});

test('skrub - dry-run does not remove files', async t => {
  // t.true(shelljs.exec(`${cliLocation} '*.tmp' '!1*' --dry-run --cwd ${t.context.tmp}`, {silent: true}).code === 0);
  t.truthy(await execa(cliLocation, ['*.tpm', '!1*', '--dry-run']));
  exists(t, ['1.tmp', '2.tmp', '3.tmp', '3.tmp', '.dot.tmp']);
});

test('skrub - removes files 1 iteration', async t => {
  t.truthy(await execa(cliLocation, ['*.tmp', '!1*', '--cwd', t.context.tmp]));

  exists(t, ['1.tmp', '.dot.tmp']);
  notExists(t, ['2.tmp', '3.tmp', '4.tmp']);
});

test('skrub - removes files 7 iterations', async t => {
  t.truthy(await execa(cliLocation, ['*.tmp', '!1*', '--cwd', t.context.tmp, '--iterations', 7]));

  exists(t, ['1.tmp', '.dot.tmp']);
  notExists(t, ['2.tmp', '3.tmp', '4.tmp']);
});
