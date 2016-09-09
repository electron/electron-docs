# electron-docs [![Build Status](https://travis-ci.org/zeke/electron-docs.svg?branch=master)](https://travis-ci.org/zeke/electron-docs)

This package consumes the [electron/electron](https://github.com/electron/electron)
repo in search of markdown files, and returns an array of file objects with stringified
file contents.

It is used by Electron's [docs linter](https://github.com/electron/electron-docs-linter).

## Installation

```sh
npm install electron-docs --save
```

## Programmatic Usage

Require it and invoke the function with no arguments:

```js
const electronDocs = require('electron-docs')

electronDocs().then(function(docs) {
  // docs is an array of objects, one for each markdown file in /docs
})
```

Each object in the `docs` array looks like this:

```js
{
 slug: "windows-store-guide",
 filename: "docs/tutorial/windows-store-guide.md",
 markdown_content: "# Windows Store Guide\n\n..."
}
```

The latest version of Electron is fetched by default. If you need a different
version, specify it as the first argument:

```js
electronDocs('1.2.0').then(function(docs) {
  // ...
})
```

You can also point to a local directory instead of downloading a tarball:

```js
const path = require('path')
const docsPath = path.join(__dirname, 'docs')
electronDocs(docsPath).then(function(docs) {
  // ...
})
```

If you prefer node-style callbacks instead of promises, those are supported too:

```js
// latest
electronDocs(function(err, docs) {
  console.log(err, docs)
})

// a specific version
electronDocs('1.0.0', function(err, docs) {
  console.log(err, docs)
})
```

## CLI Usage

Add this to your package.json file:

```json
{
  "scripts": {
    "docs": "electron-docs > docs.json"
  }
}
```

When you run `npm run docs`, the module writes the stringified JSON object to
`stdout`, and the output is piped into a file.

`stdout` ftw!

## Tests

```sh
npm i && npm t
```

## Dependencies

- [bluebird](https://github.com/petkaantonov/bluebird): Full featured Promises/A+ implementation with exceptionally good performance
- [github-latest-release](https://github.com/chentsulin/github-latest-release): Get latest release information from github repository
- [got](https://github.com/sindresorhus/got): Simplified HTTP requests
- [gunzip-maybe](https://github.com/mafintosh/gunzip-maybe): Transform stream that gunzips its input if it is gzipped and just echoes it if not
- [node-dir](https://github.com/fshost/node-dir): asynchronous file and directory operations for Node.js
- [ora](https://github.com/sindresorhus/ora): Elegant terminal spinner
- [tar-fs](https://github.com/mafintosh/tar-fs): filesystem bindings for tar-stream

## Dev Dependencies

- [tap-spec](https://github.com/scottcorgan/tap-spec): Formatted TAP output like Mocha&#39;s spec reporter
- [tape](https://github.com/substack/tape): tap-producing test harness for node and browsers


## License

MIT
