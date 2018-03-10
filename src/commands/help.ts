// Types
import { Command, Commands, Embed, EmbedField } from '../common/types'

const description =
  "I'll come to your aid and send you this message again, with any added/updated commands!"
const shouldDM = false

const fn = (): Embed => {
  // We do the require here since loading this will actually load this file.
  // If we do this outside of the function, than this will always be an empty {}
  const commands: Commands = require('./index')

  return {
    title: 'Here is a list of questions you can ask me',
    fields: Object.keys(commands)
      .filter((commandName: string) => commands[commandName].description !== '')
      .map((commandName: string): EmbedField => {
        return {
          name: `!${commandName}`,
          value: commands[commandName].description
        }
      })
  }
}

const command: Command = { description, fn, shouldDM }

export default command
