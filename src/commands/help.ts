// Types
import { Command, Embed, EmbedField } from '../common/types'

import { tab } from '../constants'

const description =
  "I'll come to your aid and send you this message again, with any added/updated commands!"
const shouldDM = false

const fn = (): Embed => {
  // We do the require here since loading this will actually load this file.
  // If we do this outside of the function, than this will always be an empty {}
  const { commands, commandsWithSubCommands } = require('./index')

  return {
    title: 'Here is a list of questions you can ask me',
    fields: Object.keys(commands)
      .map((commandName: string): EmbedField => {
        return {
          name: `!${commandName}`,
          value: commands[commandName].description
        }
      })
      .concat(
        Object.keys(commandsWithSubCommands).map(
          (commandName: string): EmbedField => {
            return {
              name: `!${commandName}`,
              value: [
                commandsWithSubCommands[commandName]['index'].description,
                ...Object.keys(commandsWithSubCommands[commandName])
                  .filter(subCommandName => subCommandName !== 'index')
                  .map(subCommandName => {
                    return `${tab}**${subCommandName}** ${
                      commandsWithSubCommands[commandName][subCommandName]
                        .description
                    }`
                  })
              ].join('\n')
            }
          }
        )
      )
  }
}

const command: Command = { description, fn, shouldDM }

export default command
