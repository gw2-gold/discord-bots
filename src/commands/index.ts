// Types
import { Commands } from '../common/types'

import fs from 'fs'
import path from 'path'

const commandNames = fs.readdirSync(__dirname)

const commands = getCommandModules(commandNames)

export default commands

function getCommandModules(
  commandNames: string[],
  parentCommand: string = ''
): Commands {
  return commandNames.reduce((accumulator, commandName) => {
    const hasSubCommands = !commandName.includes('.js')
    commandName = commandName.replace('.js', '')

    if (!hasSubCommands) {
      return {
        ...accumulator,
        [commandName]: require(path.join(__dirname, parentCommand, commandName))
          .default
      }
    }

    const subCommandNames = fs.readdirSync(path.join(__dirname, commandName))

    return {
      ...accumulator,
      [commandName]: getCommandModules(subCommandNames, commandName)
    }
  }, {})
}
