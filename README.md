# electron-docs [![Build Status](https://travis-ci.org/zeke/electron-docs.svg?branch=master)](https://travis-ci.org/zeke/electron-docs)

Fetch Electron documentation as raw markdown strings

This package:

- downloads a tarball from GitHub and slurps up all the markdown files in `/doc`.
- does not alter the source markdown.
- returns a JSON array of doc objects with stringified file contents therein.
- fetches the latest electron by default, but any version can be fetched.
- supports promises or callbacks.
- can be used programmatically.
- has a CLI that writes JSON to STDOUT.

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
 version: "1.2.3",
 filename: "docs/tutorial/windows-store-guide.md",
 basename: "windows-store-guide",
 markdown_content: "# Windows Store Guide\n\n..."
}
```

The latest version of Electron is fetched by default. If you need a different
version, specify it as the first argument:

```js
electronDocs('1.2.0')
```

If you prefer node-style callbacks instead of promises, those are supported too:

```js
electronDocs(function(err, docs) {
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
