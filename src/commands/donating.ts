// Types
import { Command, Response } from '../common/types'
import { Message } from 'discord.js'

import { tab } from '../constants'

const description =
  "I'll tell you how to donate items toward guild hall improvements! Thanks! :smiley:"
const shouldDM = false
const fn = (message: Message): Response => {
  return [
    `${
      message.author
    }, **please only donate materials if you can spare them, it is not required to donate.**`,
    'If you do, it helps all of us, including you, in the long run by allowing us to upgrade our guild hall quicker.',
    'Thank you to all that do help. To donate materials:',
    `${tab}**1)** Enter the Guild Hall`,
    `${tab}**2)** Talk to the NPC named Esa the Frugal next to the WP`,
    `${tab.repeat(
      2
    )}- Left side will be the mats you can donate from your inventory`,
    `${tab.repeat(
      2
    )}- Right side will be the mats we require and or already have.`,
    `${tab}**3)** Double click on your mats on the left side or drag them over to the right top panel.`,
    `${tab}**4)** Press Confirm.`
  ]
}

const command: Command = { description, fn, shouldDM }

export default command
