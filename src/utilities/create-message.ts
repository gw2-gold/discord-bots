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
  schedule: number[],
  organizerTags: string[]
) => {
  return function(now: Moment, next: Moment) {
    const guild = getGuild()
    const signupChannel = guild.channels.find('name', signupChannelName)
    const time = moment
      .utc()
      .hours(startHours)
      .minutes(startMinutes)
    let footer = organizerTags
      ? {
          text: `Contact ${organizerTags
            .map(organizerTag => {
              const member = guild.members.find(
                member => member.user.tag === organizerTag
              )

              return member.nickname || member.user.username
            })
            .join('/')} for more information`
        }
      : undefined

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
          value: getNamesForDays(schedule, 'Morning')
        }
      ],
      footer
    }
  }
}

export default createMessage
