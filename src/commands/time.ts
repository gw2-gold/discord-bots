// Types
import { Command, Response } from '../common/types'
import { Message } from 'discord.js'

import moment from 'moment'

const description = "I'll send you the current server time"
const shouldDM = false
const fn = (message: Message): Response => {
  const m = moment().utc()
  return [`${message.author}, the current server time is ${m.format('h:mmA')}`]
}

const command: Command = { description, fn, shouldDM }

export default command
