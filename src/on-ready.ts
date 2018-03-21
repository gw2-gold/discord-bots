// Types
import { CommandsWithSubCommands } from './common/types'

import bot from './bot'

const onReady = () => {
  const { commands, commandsWithSubCommands } = require('./commands')
  const commandNames = Object.keys(commands)
    .concat(extractSubCommandNames(commandsWithSubCommands))
    .sort()
    .filter(command => command !== 'help')

  let index = 0
  console.log('Connected')
  console.log(`Logged in as ${bot.user.tag}`)
  bot.user.setPresence({
    game: { name: `!help` }
  })

  setPresence()
  setInterval(setPresence, 15000)

  function setPresence() {
    bot.user.setPresence({
      game: { name: `!help | !${commandNames[index]}` }
    })

    index = index === commandNames.length - 1 ? 0 : index + 1
  }
}

export default onReady

function extractSubCommandNames(
  commandsWithSubCommands: CommandsWithSubCommands
): string[] {
  const commandNames: string[] = []

  Object.keys(commandsWithSubCommands).forEach(commandName => {
    commandNames.push(commandName)

    Object.keys(commandsWithSubCommands[commandName])
      .filter(subCommandName => subCommandName !== 'index')
      .forEach(subCommandName => {
        commandNames.push(`${commandName} ${subCommandName}`)
      })
  })

  return commandNames
}
