# electron-docs [![Build Status](https://travis-ci.org/electron/electron-docs.svg?branch=master)](https://travis-ci.org/electron/electron-docs)

This package consumes the [electron/electron](https://github.com/electron/electron)
repo in search of markdown files, and returns an array of file objects with stringified
file contents.

It is used by Electron's [docs linter](https://github.com/electron/electron-docs-linter).

## Installation

```sh
npm install electron-docs --save
```

## Programmatic Usage

Require the function and call it with any of the following:

- A remote branch name, like `master`
- A version number, like `1.4.4`
- A commit SHA, like `76375a83eb3a97e7aed14d37d8bdc858c765e564`
- A local directory, like `~/my/path/to/electron/`

```js
const electronDocs = require('electron-docs')

electronDocs('master').then(function(docs) {
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

When fetching docs from a local directory, be sure to use a full path:

```js
const path = require('path')
const docsPath = path.join(__dirname, 'docs')
electronDocs(docsPath).then(function(docs) {
  // ...
})
```

If you prefer node-style callbacks instead of promises, those are supported too:

```js
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

- [got](https://ghub.io/got): Simplified HTTP requests
- [gunzip-maybe](https://github.com/mafintosh/gunzip-maybe): Transform stream that gunzips its input if it is gzipped and just echoes it if not
- [node-dir](https://ghub.io/node-dir): asynchronous file and directory operations for Node.js
- [ora](https://ghub.io/ora): Elegant terminal spinner
- [path-exists](https://ghub.io/path-exists): Check if a path exists
- [pify](https://github.com/sindresorhus/pify): Promisify a callback-style function
- [semver](https://ghub.io/semver): The semantic version parser used by npm.
- [tar-fs](https://github.com/mafintosh/tar-fs): filesystem bindings for tar-stream

## Dev Dependencies

- [tap-spec](https://github.com/scottcorgan/tap-spec): Formatted TAP output like Mocha&#39;s spec reporter
- [tape](https://github.com/substack/tape): tap-producing test harness for node and browsers

## License

MIT
