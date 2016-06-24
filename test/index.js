const test = require('tape')
const semver = require('semver')
const electronDocs = require('..')

test('electronDocs', {timeout: 30*1000}, function (t) {

  t.plan(8)

  electronDocs().then(function (docs) {
    t.ok(Array.isArray(docs), 'is an array')
    t.ok(docs.length, 'is not empty')

    var doc = docs[0]
    t.ok(semver.valid(doc.version), 'has a valid semver version')
    t.ok(semver.gt(doc.version, '1.2.2'), 'fetches latest version by default')
    t.ok(doc.filename, 'each doc has a filename property')
    t.ok(doc.slug, 'each doc has a slug property')
    t.ok(doc.markdown_content, 'each doc has a markdown_content property')
  })

  electronDocs('1.2.0').then(function (docs) {
    var doc = docs[0]
    t.equal(doc.version, '1.2.0', 'allows an electron version to be specified')
  })

  // electronDocs('123.456.789').catch(function (e) {
  //   console.error(e)
  //   t.ok(e, 'errors are handled and can be caught')
  // })

})
