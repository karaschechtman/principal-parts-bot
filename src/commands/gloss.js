// monkey patch
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser

const cheerio = require('cheerio')
const request = require('request-promise')

const config = require('../config')

const defaults = {
  response_type: 'in_channel'
}

const handler = (payload, res) => {
  const { channel_name, text } = payload

  return getShortDef(text).then(def => {
    const msg = Object.assign(defaults, {
      channel: channel_name,
      text: def
    })

    res.set('content-type', 'application/json')

    res.status(200).json(msg)
  }).catch(err => {
    res.send(404, `Something went wrong. Couldn't find definition for ${text}`)
  })
}

module.exports = { handler, pattern: /gloss/i }

function getShortDef(search_term) {
  return request({
    qs: {
      search_term
    },
    transform(body) {
      return cheerio.load(body)
    },
    uri: config('GLOSS_URI')
  }).then($ => $(`#${config('GLOSS_DEF_ID')}`).text())
}
