const dotenv = require('dotenv').config()

const ENV = process.env.NODE_ENV || 'development'

const config = {
  ENV,
  PORT: process.env.PORT,
  WEBHOOK_URL: process.env.WEBHOOK_URL,
  COMMAND_TOKEN: process.env.COMMAND_TOKEN,
}

module.exports = key => (config[key] || config)
