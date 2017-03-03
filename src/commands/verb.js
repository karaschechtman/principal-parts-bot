const VERBS = require('../../verbs.json')
const VERB_KEYS = Object.keys(VERBS)

const defaults = {
  response_type: 'in_channel'
}

const handler = (payload, res) => {
  const msg = Object.assign(defaults, {
    channel: payload.channel_name,
    text: randomVerb().join(' ')
  })

  res.set('content-type', 'application/json')

  res.status(200).json(msg)
}

module.exports = { handler, pattern: /verb/i }

function randomVerb() {
  return VERBS[
    VERB_KEYS[Math.floor(Math.random() * VERB_KEYS.length)]
  ]
}
