const fs = require('fs')

const csv = fs.readFileSync('verbs.csv', 'utf8')

// FIXME: hacky workaround for removing final ['']
module.exports = csv.split('\n').map(r => r.split(',')).slice(0, -1)
