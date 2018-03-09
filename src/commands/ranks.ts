// Types
import { Command, Response } from '../common/types'
import { Message } from 'discord.js'

const description =
  "I'll send you info about the guild ranks and a link for more details"
const shouldDM = false
const fn = (message: Message): Response => {
  return [
    `${message.author}, here is a list of the guild ranks:`,
    '**Grand Master**: Reserved for the Guild Leaders, Sakkuth and Zara.',
    '**High Councillor**: Senior Officer',
    '**Knights Guard**: Junior Officer',
    '**Knight**: Core of our guild. Been in [GOLD] for at least 1 month',
    "**Squire**: Starting rank. Don't worry, you are still awesome :)",
    '**Pilgrim**: After being inactive for 2 months, you will be placed here',
    'More details can be found here: https://docs.google.com/document/d/1PZcuT8VsBJBkDQ3iEx19WP5SChymnCQBI-pTKKb-EB4'
  ]
}

const command: Command = { description, fn, shouldDM }

export default command
