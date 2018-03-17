// Types
import { Commands } from '../common/types'

import fs from 'fs'

const commandNames = fs
  .readdirSync(__dirname)
  .map(command => command.slice(0, -3))
  .filter(command => command !== 'index')
const commands: Commands = {}

commandNames.forEach((commandName: string) => {
  commands[commandName.replace('-', '')] = require(`./${commandName}`).default
})

export = commands
