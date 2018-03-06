const { tab } = require('../constants')

const description =
  "I'll come to your aid and send you this message again, with any added/updated commands!"
const shouldDM = false

const fn = message => {
  // We do the require here since loading this will actually load this file.
  // If we do this outside of the function, than this will always be an empty {}
  const commands = require('./index')

  return [
    `hey ${message.author},`,
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
