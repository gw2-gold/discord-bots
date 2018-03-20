// Types
import {
  Commands,
  CommandWithSubCommand,
  CommandsWithSubCommands
} from '../common/types'

import fs from 'fs'
import path from 'path'

const commandNames = fs.readdirSync(__dirname)
const commandNamesWithoutSubCommands = commandNames
  .filter(command => command.includes('.js') && command !== 'index.js')
  .map(command => command.replace('.js', ''))
const commandNamesWithSubCommands = commandNames.filter(
  command => !command.includes('.js')
)
const commands: Commands = {}
const commandsWithSubCommands: CommandsWithSubCommands = {}

commandNamesWithoutSubCommands.forEach((commandName: string) => {
  commands[commandName.replace('-', '')] = require(`./${commandName}`).default
})

commandNamesWithSubCommands.forEach(command => {
  const subCommandNames = fs.readdirSync(path.join(__dirname, command))
  const subCommands: CommandWithSubCommand = {}

  subCommandNames.forEach(commandName => {
    subCommands[commandName.replace('.js', '')] = require(path.join(
      __dirname,
      command,
      commandName
    )).default
  })

  commandsWithSubCommands[command] = subCommands
})

export = { commands, commandsWithSubCommands }
