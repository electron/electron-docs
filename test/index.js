const test = require('tape')
const path = require('path')
const semver = require('semver')
const electronDocs = require('..')

test('electronDocs', {timeout: 30 * 1000}, function (t) {
  t.plan(11)

  electronDocs('master').then(function (docs) {
    t.comment('fetch by branch name')
    t.ok(docs.length > 0, 'docs is a non-empty array')
    t.ok(docs.every(doc => doc.filename.length > 0), 'every doc has a filename property')
    t.ok(docs.every(doc => doc.slug.length > 0), 'every doc has a slug property')
    t.ok(docs.every(doc => doc.markdown_content.length > 0), 'every doc has a markdown_content property')
  })

  electronDocs('1.2.0').then(function (docs) {
    t.comment('fetch by version number')
    var doc = docs[0]
    t.ok(docs.every(doc => doc.filename.length > 0), 'every doc has a filename property')
  })

  electronDocs('76375a83eb3a97e7aed14d37d8bdc858c765e564').then(function (docs) {
    t.comment('fetch by commit SHA')
    var doc = docs[0]
    t.ok(docs.every(doc => doc.filename.length > 0), 'every doc has a filename property')
  })

  electronDocs(path.join(__dirname, 'fixtures')).then(function (docs) {
    t.comment('fetch from local directory')
    t.ok(docs.length > 0, 'docs is a non-empty array')
    t.ok(docs.every(doc => doc.filename.length > 0), 'every doc has a filename property')
    t.ok(docs.every(doc => doc.slug.length > 0), 'every doc has a slug property')
    t.ok(docs.every(doc => doc.markdown_content.length > 0), 'every doc has a markdown_content property')

    t.comment('structs directory')
    t.ok(docs.find(doc => doc.slug === 'bounds'), 'the structures docs are found correctly')
  })
})
