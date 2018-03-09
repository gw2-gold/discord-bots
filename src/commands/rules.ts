//Types
import { Command, Response } from '../common/types'
import { Message } from 'discord.js'

const description = "I'll send you the link to the guild rules"
const shouldDM = false
const fn = (message: Message): Response => {
  return [
    `${message.author}, please adhere to the rules of the guild.`,
    'They can be found here: https://docs.google.com/document/d/13gOKdF8gcgQ7AfEvSGbR4wlE9-H03Tvjy3md4WdiDug/edit'
  ]
}

const command: Command = { description, fn, shouldDM }

export default command
