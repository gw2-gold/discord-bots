// Types
import { Command, Commands, Response } from '../common/types'
import { Message } from 'discord.js'

import { tab } from '../constants'

const description =
  "I'll come to your aid and send you this message again, with any added/updated commands!"
const shouldDM = false

const fn = (message: Message): Response => {
  // We do the require here since loading this will actually load this file.
  // If we do this outside of the function, than this will always be an empty {}
  const commands: Commands = require('./index')

  return [
    `${message.author}, here's a list of all the questions you can ask me:`
  ].concat(
    Object.keys(commands)
      .map((commandName: string): string => {
        const { description } = commands[commandName]

        if (!description || description === '') {
          return ''
        }

        return `${tab}- **${commandName}**: ${description}`
      })
      .filter(val => val !== '')
  )
}

const command: Command = { description, fn, shouldDM }

export default command
