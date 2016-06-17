const fs = require('fs')
const path = require('path')
const got = require('got')
const dir = require('node-dir')
const tar = require('tar-fs')
const gunzip = require('gunzip-maybe')
const latestRelease = require('github-latest-release')

function docs (version, callback) {
  if (!callback) {
    callback = version
    version = null
    latestRelease('electron', 'electron', function (err, release) {
      download(release.tag_name, callback)
    })
  } else {
    download(version, callback)
  }
}

function download (version, callback) {
  version = version.replace(/v/, '')
  var docs = []
  var tarballUrl = `https://api.github.com/repos/electron/electron/tarball/v${version}`
  var electronDir
  var tmpdir = require('os').tmpdir()
  var filename = `electron-v${version}.tgz`
  var tarball = path.join(tmpdir, filename)

  var extractor = tar.extract(tmpdir, {
    ignore: (name) => {
      return !name.match('docs/')}
  })
    .on('entry', function extracting (header, stream, next) {
      if (!electronDir) {
        electronDir = path.join(tmpdir, header.name.split('/')[0])
      }
    })
    .on('finish', function extracted () {
      dir.readFiles(
        path.join(electronDir, 'docs'),
        function (err, content, filename, next) {
          docs.push({
            slug: path.basename(filename, '.md'),
            filename: path.relative(electronDir, filename),
            version: version,
            markdown_content: content
          })
          next()
        },
        function (err, files) {
          if (err) return callback(err)
          callback(null, docs)
        })
    })

  got.stream(tarballUrl)
    .pipe(gunzip())
    .pipe(extractor)
    .on('error', function(e) {
      callback(e)
    })
}

module.exports = require('bluebird').promisify(docs)
