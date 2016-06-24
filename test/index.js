const test = require('tape')
const path = require('path')
const semver = require('semver')
const electronDocs = require('..')

test('electronDocs', {timeout: 30 * 1000}, function (t) {
  t.plan(9)

  electronDocs().then(function (docs) {
    t.comment('default to latest version')
    t.ok(docs.length > 0, 'docs is a non-empty array')
    t.ok(docs.every(doc => doc.filename.length > 0), 'every doc has a filename property')
    t.ok(docs.every(doc => doc.slug.length > 0), 'every doc has a slug property')
    t.ok(docs.every(doc => doc.markdown_content.length > 0), 'every doc has a markdown_content property')
  })

  electronDocs('1.2.0').then(function (docs) {
    t.comment('specific version')
    var doc = docs[0]
    t.ok(docs.every(doc => doc.filename.length > 0), 'every doc has a filename property')
  })

  electronDocs(path.join(__dirname, 'fixtures')).then(function (docs) {
    t.comment('local directory')
    t.ok(docs.length > 0, 'docs is a non-empty array')
    t.ok(docs.every(doc => doc.filename.length > 0), 'every doc has a filename property')
    t.ok(docs.every(doc => doc.slug.length > 0), 'every doc has a slug property')
    t.ok(docs.every(doc => doc.markdown_content.length > 0), 'every doc has a markdown_content property')
  })
})
