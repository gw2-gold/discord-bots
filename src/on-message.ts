// Types
import { Command, Embed } from './common/types'
import { Message } from 'discord.js'

import allCommands from './commands'
import getSimilarCommand from './get-similar-command'
import parseMessage from './parse-message'
import { embedColor } from './constants'

const { COMMAND_CHARACTER = '!' } = process.env
const { commands, commandsWithSubCommands } = allCommands

const onMessage = async (message: Message) => {
  if (message.author.bot) {
    return
  }

  const parsedMessage = parseMessage(message.content)
  let [commandName, args]: [string, string[]] = parsedMessage
  const mentions = message.mentions ? message.mentions.users.array() : []
  // let prependedMessage: Response = []

  // If this message doesn't start with the COMMAND_CHARACTER,
  // just return, because we don't really care
  if (!commandName.startsWith(COMMAND_CHARACTER)) {
    return
  }

  // Remove the COMMAND_CHARACTER from the beginning of the string
  commandName = commandName.slice(1)

  // If we don't have an exact match for the command that the user typed,
  // we can check for similar commands, in case they mistyped it
  if (!commands[commandName] && !commandsWithSubCommands[commandName]) {
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
    command = commands[commandName]
  }

  if (commandsWithSubCommands[commandName]) {
    const subCommand = args[0] || 'index'

    if (
      subCommand &&
      !Object.keys(commandsWithSubCommands[commandName]).includes(subCommand)
    ) {
      message.channel.send({
        embed: {
          title: "I don't understand that command",
          description: 'Try using the `!help` command',
          color: embedColor
        }
      })

      return
    }

    command = commandsWithSubCommands[commandName][subCommand]
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
