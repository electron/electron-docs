const test = require('tape')
const path = require('path')
const semver = require('semver')
const electronDocs = require('..')

test('electronDocs', {timeout: 30 * 1000}, function (t) {
  t.plan(14)

  electronDocs('main').then(function (docs) {
    t.comment('fetch by branch name')
    t.ok(docs.length > 0, 'docs is a non-empty array')
    t.ok(docs.every(doc => doc.filename.length > 0), 'every doc has a filename property')
    t.ok(docs.every(doc => doc.slug.length > 0), 'every doc has a slug property')
    t.ok(docs.every(doc => doc.markdown_content.length > 0), 'every doc has a markdown_content property')

    // console.log(docs.map(doc => doc.filename))
    t.comment('non-API files are included')
    t.ok(docs.find(doc => doc.filename === 'styleguide.md'), 'styleguide.md')
    t.ok(docs.find(doc => doc.filename === 'tutorial/about.md'), 'tutorial/about.md')
  })

  electronDocs('1.2.0').then(function (docs) {
    t.comment('fetch by version number')
    var doc = docs[0]
    t.ok(docs.every(doc => doc.filename.length > 0), 'every doc has a filename property')
  })

  electronDocs('v1.7.0').then(function (docs) {
    t.comment('fetch by version number with leading v')
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
