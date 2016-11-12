const fs = require('fs')
const path = require('path')
const got = require('got')
const dir = require('node-dir')
const tar = require('tar-fs')
const pathExists = require('path-exists').sync
const gunzip = require('gunzip-maybe')
const semver = require('semver')
const assert = require('assert')

function docs (input, callback) {
  assert(typeof input === 'string', 'A valid branch name, SHA, version number, or directory is required as the first argument')
  assert(typeof callback === 'function', 'A callback function is required as the second argument')

  if (pathExists(input)) {
    readFromDisk(input, callback)
  } else {
    download(input, callback)
  }
}

function download (version, callback) {
  if (!!semver.valid(version)) version = `v${version}`
  var tarballUrl = `https://github.com/electron/electron/archive/${version}.tar.gz`
  var electronDir
  var tmpdir = require('os').tmpdir()
  var tarball = path.join(tmpdir, `electron-${version}.tgz`)

  var extractor = tar.extract(tmpdir, {
    ignore: (name) => { return !name.match(/[\\/]docs[\\/]/) }
  })
    .on('entry', function extracting (header, stream, next) {
      if (!electronDir) {
        electronDir = path.join(tmpdir, header.name.split('/')[0])
      }
    })
    .on('finish', function extracted () {
      readFromDisk(path.join(electronDir, 'docs', 'api'), callback)
    })

  got.stream(tarballUrl)
    .pipe(gunzip())
    .pipe(extractor)
    .on('error', function (e) {
      callback(e)
    })
}

function readFromDisk (directory, callback) {
  var docs = []
  dir.readFiles(
    directory,
    function (err, content, filename, next) {
      var doc = {
        slug: path.basename(filename, '.md'),
        filename: path.relative(directory, filename),
        markdown_content: content
      }
      if (typeof version !== 'undefined') docs.version = version
      docs.push(doc)
      next()
    },
    function (err, files) {
      if (err) return callback(err)
      callback(null, docs)
    })
}

module.exports = require('pify')(docs)
