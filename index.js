const fs = require('fs')
const path = require('path')
const got = require('got')
const dir = require('node-dir')
const tar = require('tar-fs')
const exists = require('path-exists').sync
const gunzip = require('gunzip-maybe')
const latestRelease = require('github-latest-release')
const semver = require('semver')

function docs (version, callback) {
  if (!callback) {
    // version not specified, default to latest
    callback = version
    version = null
    latestRelease('electron', 'electron', function (err, release) {
      download(release.tag_name, callback)
    })
  } else if (semver.valid(version)) {
    // download specified version number
    download(version, callback)
  } else if (exists(version)) {
    // version is a local directory
    readLocalFiles(version, (err, files) => {
      if (err) return callback(err)
      readLocalFiles(path.resolve(version, 'structures'), (structErr, structFiles) => {
        if (structErr) return callback(structErr)
        callback(null, files.concat(structFiles))
      })
    })
  } else {
    console.error(`invalid electron version specified: ${version}`)
  }
}

function download (version, callback) {
  version = version.replace(/v/, '')
  var tarballUrl = `https://github.com/electron/electron/archive/v${version}.tar.gz`
  var electronDir
  var tmpdir = require('os').tmpdir()
  var filename = `electron-v${version}.tgz`
  var tarball = path.join(tmpdir, filename)

  var extractor = tar.extract(tmpdir, {
    ignore: (name) => { return !name.match('docs/')} }
  )
    .on('entry', function extracting (header, stream, next) {
      if (!electronDir) {
        electronDir = path.join(tmpdir, header.name.split('/')[0])
      }
    })
    .on('finish', function extracted () {
      readLocalFiles(path.join(electronDir, 'docs', 'api'), (err, files) => {
        if (err) return callback(err)
        readLocalFiles(path.join(electronDir, 'docs', 'api', 'structures'), (structErr, structFiles) => {
          if (structErr) return callback(structErr)
          callback(null, files.concat(structFiles))
        })
      })
    })

  got.stream(tarballUrl)
    .pipe(gunzip())
    .pipe(extractor)
    .on('error', function (e) {
      callback(e)
    })
}

function readLocalFiles (directory, callback) {
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

module.exports = require('bluebird').promisify(docs)
