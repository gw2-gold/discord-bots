const getCommands = require('./get-commands')
const parseMessage = require('./parse-message')

const commands = getCommands()

const onMessage = message => {
  if (message.author.bot) {
    return
  }

  const [command, args] = parseMessage(message.content)
  const mentions = message.mentions ? message.mentions.users.array() : []

  if (!commands[command]) {
    message.channel.send([
      "The command you entered doesn't exist. Maybe the spelling was wrong :/"
    ])

    return
  }

  const { fn, shouldDM } = commands[command]
  const response = fn(message, args, mentions)
  const channel = shouldDM ? message.author : message.channel

  if (shouldDM && message.channel.type !== 'dm') {
    message.channel.send([
      `Hey ${
        message.author
      }! I just sent you a DM with the info you asked for :smiley:`
    ])
  }

  channel.send(response)
}

module.exports = onMessage
