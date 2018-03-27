// Types
import { Command } from '../../common/types'
import { Moment } from 'moment'

import getGuild from '../../get-guild'
import createScheduleCommand from '../../create-schedule-command'

// Sunday and Thursday
const schedule = [0, 4]
const message = (now: Moment, next: Moment) => {
  const guild = getGuild()
  const signupChannel = guild.channels.find('name', 'fractal-signup')
  return {
    title: `The next Fractal runs starts ${now.to(next)}`,
    description: [
      `To signup for Fractals, go to ${signupChannel}`,
      'Fractal runs are at 1:00am Server Time.',
      '__For now, all scheduled days are for training__'
    ].join('\n\n'),
    fields: [
      {
        name: '[US/Can/Alaska]',
        value: 'Saturday and Wednesday Night'
      },
      {
        name: '[OcX/SEA]',
        value: 'Sunday and Thursday Morning'
      }
    ],
    footer: {
      text:
        'Want to run Fractals outside of these times? Just ask in discord #general or in-game Guild chat'
    }
  }
}

const description =
  "I'll send you general time info about Fractals as well as how long it is until the next Fractal run"
const shouldDM = false
const fn = createScheduleCommand(1, 0, schedule, message)

const command: Command = { description, fn, shouldDM }

export default command
