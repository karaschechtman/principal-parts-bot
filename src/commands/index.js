const fs = require('fs')

const verbs = require('../../resources/verbs')

const verbCommands = verbs.map(v => ({
  handler: exactMatchHandler(v),
  pattern: v[0]
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
      text: a.join(',')
    })
  }
}
