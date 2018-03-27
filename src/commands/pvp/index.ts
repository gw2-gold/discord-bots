// Types
import { Command } from '../../common/types'
import { Moment } from 'moment'

import getGuild from '../../get-guild'
import createScheduleCommand from '../../create-schedule-command'

// Tuesday, Wednesday, Thursday, Friday
const schedule = [2, 3, 4, 5]
const message = (now: Moment, next: Moment) => {
  const guild = getGuild()
  const signupChannel = guild.channels.find('name', 'pvp-signup')
  return {
    title: `The next PvP session starts ${now.to(next)}`,
    description: [
      `To signup for PvP, go to ${signupChannel}`,
      'PvP sessions are at 12:00am Server Time and are about an hour and a half long.'
    ].join('\n\n'),
    fields: [
      {
        name: '[US/Can/Alaska]',
        value: 'Monday - Thursday Night'
      },
      {
        name: '[OcX/SEA]',
        value: 'Tuesday - Friday Morning'
      }
    ],
    footer: {
      text:
        'Want to PvP outside of these times? Just ask in discord #general or in-game Guild chat'
    }
  }
}

const description =
  "I'll send you general time info about PvP as well as how long it is until the next PvP session"
const shouldDM = false
const fn = createScheduleCommand(0, 0, schedule, message)

const command: Command = { description, fn, shouldDM }

export default command
