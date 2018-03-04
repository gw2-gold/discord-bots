const getCommands = require('../get-commands')
const { tab } = require('../constants')

const description =
  "I'll come to your aid and send you this message again, with any added/updated commands!"
const shouldDM = true

const commands = { ...getCommands(false), '!help': { description } }

const fn = message => {
  return [
    `hey **${message.author.username}**,`,
    ,
    "here's a list of all the questions you can ask me here or while in the **[GOLD]** server:"
  ].concat(
    Object.keys(commands)
      .map(commandName => {
        const { description } = commands[commandName]

        if (!description || description === '') {
          return
        }

        return `${tab}- **${commandName}**: ${description}`
      })
      .filter(val => val !== undefined)
  )
}

module.exports = { description, fn, shouldDM }
