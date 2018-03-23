// Types
import { Command, Embed, EmbedField } from '../common/types'

import objectPath from 'object-path'
import getAllCommandPaths from '../get-all-command-paths'

const description =
  "I'll come to your aid and send you this message again, with any added/updated commands!"
const shouldDM = false

const fn = (): Embed => {
  // We do the require here since loading this will actually load this file.
  // If we do this outside of the function, than this will always be an empty {}
  const commands = require('./index').default

  return {
    title: 'Here is a list of questions you can ask me',
    fields: getAllCommandPaths(commands).map(
      (commandName: string): EmbedField => {
        console.log(commandName, <Command>objectPath.get(
          commands,
          `${commandName}.description`
        ))
        return {
          name: `!${commandName.replace('.index', '').replace('.', ' ')}`,
          value: objectPath.get(commands, `${commandName}.description`)
        }
      }
    )
  }
}

const command: Command = { description, fn, shouldDM }

export default command
