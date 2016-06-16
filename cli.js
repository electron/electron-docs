#!/usr/bin/env node

const ora = require('ora')
const docs = require('.')
const spinner = ora('Downloading latest Electron docs').start()

docs()
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
