const fs = require('fs')

const VERBS = require('../../verbs.json')

const verbCommands = Object.keys(VERBS).map(k => ({
  handler: exactMatchHandler(VERBS[k]),
  pattern: k
}))

module.exports = fs.readdirSync(__dirname).reduce((cmds, file) => {
  if (file === 'index.js') {
    return cmds
  }

  return cmds.concat(require(`./${file}`))
}, verbCommands)

function exactMatchHandler(a) {
  return function(payload, res) {
    res.set('content-type', 'application/json')

    res.status(200).json({
      response_type: 'in_channel',
      text: a.join(' ')
    })
  }
}
