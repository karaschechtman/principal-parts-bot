const dotenv = require('dotenv').config()

const ENV = process.env.NODE_ENV || 'development'

const config = {
  ENV,
  GLOSS_DEF_ID: process.env.GLOSS_DEF_ID,
  GLOSS_URI: process.env.GLOSS_URI,
  PORT: process.env.PORT,
  WEBHOOK_URL: process.env.WEBHOOK_URL,
  COMMAND_TOKENS: process.env.COMMAND_TOKENS.split(',')
}

module.exports = key => (config[key] || config)
