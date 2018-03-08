const fs = require('fs')
const path = require('path')

const commandNames = fs
  .readdirSync(__dirname)
  .map(command => command.slice(0, -3))
  .filter(
    command =>
      !['add-event', 'delete-event', 'events', 'index'].includes(command)
  )
const commands = {}

commandNames.forEach(commandName => {
  commands[commandName.replace('-', '')] = require(`./${commandName}`)
})

module.exports = commands
