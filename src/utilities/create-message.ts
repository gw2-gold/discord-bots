// Types
import { Moment } from 'moment'

import moment from 'moment'

import getGuild from '../utilities/get-guild'
import getNamesForDays from '../utilities/get-names-for-days'

const createMessage = (
  signupChannelName: string,
  type: string,
  startHours: number,
  startMinutes: number,
  extraMessage: string,
  schedule: number[]
) => {
  return function(now: Moment, next: Moment) {
    const guild = getGuild()
    const signupChannel = guild.channels.find('name', signupChannelName)
    const time = moment
      .utc()
      .hours(startHours)
      .minutes(startMinutes)

    return {
      title: `We next run ${type} ${now.to(next)}`,
      description: [
        `To signup for ${type}, go to ${signupChannel}`,
        `We run ${type} at ${time.format('h:mma')} Server Time`
      ]
        .concat(extraMessage ? [extraMessage] : [])
        .join('\n\n'),
      fields: [
        {
          name: '[US/Can/Alaska]',
          value: getNamesForDays(schedule, 'Evening', -1)
        },
        {
          name: '[OcX/SEA]',
          value: getNamesForDays(schedule, 'Evening')
        }
      ],
      footer: {
        text: `Want to run ${type} outside of these times? Just ask in discord #general or in-game Guild chat`
      }
    }
  }
}

export default createMessage
