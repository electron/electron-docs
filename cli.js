#!/usr/bin/env node

const ora = require('ora')
const docs = require('.')

const input = process.argv.length >= 3 ? process.argv[2] : 'master'
const spinner = ora(`Downloading Electron docs from ${input}`).start()

docs(input)
  .then(function (docs) {
    process.stdout.write(JSON.stringify(docs, null, 2))
  })
  .catch(function (err) {
    process.stderr.write(err.toString())
  })
  .then(function() {
    spinner.stop()
    process.exit()
  })
