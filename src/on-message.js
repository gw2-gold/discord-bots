const commands = require('./commands')
const getSimilarCommand = require('./get-similar-command')
const parseMessage = require('./parse-message')

const { COMMAND_CHARACTER = '!' } = process.env

const onMessage = message => {
  if (message.author.bot) {
    return
  }

  const parsedMessage = parseMessage(message.content)
  let [command] = parsedMessage
  const [, args] = parsedMessage
  const mentions = message.mentions ? message.mentions.users.array() : []
  let prependedMessage = []

  // If this message doesn't start with the COMMAND_CHARACTER,
  // just return, because we don't really care
  if (!command.startsWith(COMMAND_CHARACTER)) {
    return
  }

  // Remove the COMMAND_CHARACTER from the beginning of the string
  command = command.slice(1)

  // If we don't have an exact match for the command that the user typed,
  // we can check for similar commands, in case they mistyped it
  if (!commands[command]) {
    const similarCommand = getSimilarCommand(command)
    if (!similarCommand) {
      return
    }

    prependedMessage = [
      `You sent me **!${command}**, but I think you may have meant to send **!${similarCommand}**`,
      'Just in case, I included the results below! Sorry if I am wrong about this one, I am trying my best!',
      ,
    ]
    command = similarCommand
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

  channel.send(prependedMessage.concat(response))
}

module.exports = onMessage
