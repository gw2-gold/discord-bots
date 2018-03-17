// Types
import { Command, Embed } from '../common/types'

import { tab } from '../constants'

const description =
  "I'll tell you how to donate items toward guild hall improvements! Thanks! :smiley:"
const shouldDM = false
const fn = (): Embed => {
  return {
    title:
      'Please only donate materials if you can spare them, it is not required to donate',
    description: [
      'If you do, it helps all of us, including you, in the long run by allowing us to upgrade our guild hall quicker.',
      'Thank you to all that do help.'
    ].join('\n'),
    fields: [
      {
        name: 'How to donate',
        value: [
          '| Enter the Guild Hall',
          '| Talk to the NPC named Esa the Frugal next to the WP',
          `${tab.repeat(
            2
          )}- Left side will be the mats you can donate from your inventory`,
          `${tab.repeat(
            2
          )}- Right side will be the mats we require and or already have.`,
          `| Double click on your mats on the left side or drag them over to the right top panel.`,
          `| Press Confirm.`
        ].join('\n')
      }
    ]
  }
}

const command: Command = { description, fn, shouldDM }

export default command
