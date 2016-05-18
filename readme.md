<p align="center">
  <a><img src="img/logo.png" title="skrub logo"/></a>

  <br>

  <b>Irreversible file deletion on every operating system</b>

  <br>
  <br><br><a href="https://travis-ci.org/dawsonbotsford/skrub-cli"><img src="https://api.travis-ci.org/dawsonbotsford/skrub-cli.svg?branch=master"></a>
  <a href="https://ci.appveyor.com/project/dawsonbotsford/skrub-cli"><img src="https://ci.appveyor.com/api/projects/status/two1klt2y7va7qab?svg=true"></a>

  <br>

  <a href="https://www.npmjs.com/package/skrub-cli"><img src="https://img.shields.io/npm/v/skrub-cli.svg"></a>
  <a href="http://npmjs.org/skrub-cli"><img src="http://img.shields.io/npm/dm/skrub-cli.svg?style=flat"></a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg"></a>
</p>


<br>

Works on OS X, Linux, and Windows

In contrast to `rm`, which [leaves file contents unallocated in memory](http://unix.stackexchange.com/questions/10883/where-do-files-go-when-the-rm-command-is-issued), `skrub` first floods the file with garbage data and then **removes it forever**.

Looking for the [npm module instead](https://github.com/dawsonbotsford/skrub)?

<br>

## Install

```
npm install --global skrub-cli
```

<br>

## Usage

In it's basic form, `skrub` is be used just like `rm`.

Commands like `skrub *` will perform much like `rm *`, with the excption that the file data is securely removed from your system.

```
$ skrub --help

  Usage
      $ skrub <path|glob> [...]

    Options
      -d, --dry-run  List what would be skrubbed instead of skrubbing

    Examples
      $ skrub unicorn.png rainbow.png
      $ skrub ../* '!../thatSuperImportantThing.txt'
      $ skrub ../beCarefulHere --dry-run
```

*You can use [glob patterns](https://github.com/sindresorhus/globby#globbing-patterns).*

<br>

## [FAQ](https://github.com/dawsonbotsford/skrub#faq)

<br>

## Related

* [skrub-cli](https://github.com/dawsonbotsford/skrub-cli)
* [kiwf](https://github.com/BrianNewsom/kiwf)
* [del](https://github.com/sindresorhus/del)
* [trash](https://github.com/sindresorhus/trash)

<br>

## License

MIT © [Dawson Botsford](http://dawsonbotsford.com)
