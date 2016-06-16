# electron-docs [![Build Status](https://travis-ci.org/zeke/electron-docs.svg?branch=master)](https://travis-ci.org/zeke/electron-docs)

Fetch Electron documentation as raw markdown strings

This package:

- Downloads docs for any version of Electron
- Downloads the latest version of Electron by default
- Returns a JSON array of documents
- Supports promises or callbacks
- Can be used programmatically or on the command line

## Installation

```sh
npm install electron-docs --save
```

## Programmatic Usage

Require it and invoke the function with no arguments:

```js
const docs = require('electron-docs')

docs().then(function(docs) {
  // docs is an array of objects, one for each markdown file in /docs
})
```

Each object in the `docs` array looks like this:

```js
{
 version: "1.2.3",
 filename: "docs/tutorial/windows-store-guide.md",
 basename: "windows-store-guide",
 markdown_content: "# Windows Store Guide\n\n..."
}
```

The latest version of Electron is fetched by default. If you need a different
version, specify it as the first argument:

```js
docs('1.2.0')
```

If you prefer node-style callbacks instead of promises, those are supported too:

```js
docs(function(err, docs) {
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
