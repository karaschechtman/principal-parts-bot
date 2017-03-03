const verbs = require('../../resources/verbs')

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
  return verbs[Math.floor(Math.random() * verbs.length)]
}
