// Types
import { Moment } from 'moment'

import moment from 'moment'

import getGuild from '../utilities/get-guild'

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
          value:
            schedule.reduce((prev, curr, currIndex, array) => {
              const isTwoFromEnd = currIndex === array.length - 2
              const isOneFromEnd = currIndex === array.length - 1

              return (
                prev +
                moment
                  .utc()
                  .day(curr - 1)
                  .format('dddd') +
                (isTwoFromEnd ? ' and ' : '') +
                (isOneFromEnd || isTwoFromEnd ? '' : ', ')
              )
            }, '') + ' Evening'
        },
        {
          name: '[OcX/SEA]',
          value:
            schedule.reduce((prev, curr, currIndex, array) => {
              const isTwoFromEnd = currIndex === array.length - 2
              const isOneFromEnd = currIndex === array.length - 1

              return (
                prev +
                moment
                  .utc()
                  .day(curr)
                  .format('dddd') +
                (isTwoFromEnd ? ' and ' : '') +
                (isOneFromEnd || isTwoFromEnd ? '' : ', ')
              )
            }, '') + ' Morning'
        }
      ],
      footer: {
        text: `Want to run ${type} outside of these times? Just ask in discord #general or in-game Guild chat`
      }
    }
  }
}

export default createMessage
