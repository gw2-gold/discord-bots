// Types
import { Command, Embed, CommandWithSubCommand } from '../common/types'
import { Message } from 'discord.js'

import commands from '../commands'
import getSimilarCommand from '../utilities/get-similar-command'
import parseMessage from '../utilities/parse-message'
import { embedColor } from '../utilities/constants'
import commandHasSubCommand from '../utilities/command-has-sub-command'

const onMessage = async (message: Message) => {
  // If this message is from a bot, we don't care about responding
  if (message.author.bot) {
    return
  }

  const parsedMessage = parseMessage(message.content)
  let [commandName, args]: [string, string[]] = parsedMessage

  // If we didn't parse a commandName out of the message,
  // just return, because we don't really care
  if (!commandName) {
    return
  }

  // const parsedMessage = parseMessage(message.content)
  const mentions = message.mentions ? message.mentions.users.array() : []

  // Remove the COMMAND_CHARACTER from the beginning of the string
  commandName = commandName.slice(1)

  // If we don't have an exact match for the command that the user typed,
  // we can check for similar commands, in case they mistyped it
  if (!commands[commandName]) {
    const similarCommand = getSimilarCommand(commandName)
    if (!similarCommand) {
      return
    }

    commandName = similarCommand
  }

  // I don't really understand why I can't do this without
  // typecasting the object, but this is fine.
  let command: Command = <Command>{}

  if (commands[commandName]) {
    command = <Command>commands[commandName]
  }

  if (commandHasSubCommand(commands, commandName)) {
    let subCommandName = args[0] || 'index'
    const similarSubCommand = getSimilarCommand(subCommandName, commandName)
    const subCommands = Object.keys(commands[commandName])

    if (!subCommands.includes(subCommandName)) {
      if (similarSubCommand) {
        subCommandName = similarSubCommand
      } else {
        subCommandName = 'index'
      }
    }

    command = (<CommandWithSubCommand>commands[commandName])[subCommandName]
  }

  if (!command) {
    return
  }

  message.channel.startTyping()

  const { fn, shouldDM } = command
  const response: Embed = await fn(message, args, mentions)
  const channel = shouldDM ? message.author : message.channel

  if (shouldDM && message.channel.type !== 'dm') {
    message.channel.send({
      embed: {
        description: [
          `Hey ${
            message.author
          }! I just sent you a DM with the info you asked for :smiley:`
        ]
      }
    })
  }

  channel.send({
    embed: { ...response, color: embedColor }
  })

  message.channel.stopTyping()
}

export default onMessage
