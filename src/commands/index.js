const fs = require('fs')
const path = require('path')

const commandNames = fs
  .readdirSync(__dirname)
  .map(command => command.slice(0, -3))
  .filter(command => command !== 'index')
const commands = {}

commandNames.forEach(commandName => {
  commands[commandName.replace('-', '')] = require(`./${commandName}`)
})

module.exports = commands
