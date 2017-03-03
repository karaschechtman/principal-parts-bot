const express = require('express')
const bodyParser = require('body-parser')

const commands = require('./commands')
const config = require('./config')
const verbCommand = require('./commands/verb')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => { res.send('hi!') })

app.post('/commands', (req, res) => {
  const { body } = req

  if (!body || body.token !== config('COMMAND_TOKEN')) {
    const err = 'Uh-oh. Something went wrong with that request. Is everything configured properly?'

    res.status(401).end(err)

    return
  }

  const command = commands.reduce(
    (m, cmd) => (body.text || '').match(cmd.pattern) ? cmd : m,
    verbCommand
  )

  command.handler(body, res)
})

app.listen(config('PORT'), (err) => {
  if (err) throw err

  console.log(`Principal Parts Bot is listening on port ${config('PORT')}`)
})
