// Types
import { Moment } from 'moment'

import moment from 'moment'

import getGuild from '../utilities/get-guild'
import getNamesForDays from '../utilities/get-names-for-days'
import { stripIndent, oneLineCommaListsOr } from 'common-tags'

/**
 * Create a message about the schedule for a particular game type
 * @param signupChannelName {string} A string indicating the name of the channel used for signups
 * @param gameType {string} A string indicating the game type. Allowed values: 'Fractals', 'Guild Missions', 'PvP', 'Raids'
 * @param startHours {number} A number from 0 - 24 indicating the hour at which an event starts
 * @param startMinutes {number} A number from 0 - 59 indicating the minutes at which an event starts
 * @param schedule {number[]} An array of numbers, 0 (Sunday) - 6 (Saturday), each indicating a day of the week an even runs
 * @param extraMessage {string} A string indicating an extra message to be printed before the dates that get listed
 * @param organizerTags {string[]} An array of organizer discord tags to be put in the footer of the message
 * @returns Embed
 */
const createMessage = (
  signupChannelName: string,
  gameType: string,
  startHours: number,
  startMinutes: number,
  extraMessage: string,
  schedule: number[],
  organizerTags: string[]
): Function => {
  return function(now: Moment, next: Moment) {
    const guild = getGuild()
    const signupChannel = guild.channels.find('name', signupChannelName)
    const time = moment
      .utc()
      .hours(startHours)
      .minutes(startMinutes)
    let footer = organizerTags
      ? {
          text: oneLineCommaListsOr`
            Contact ${organizerTags.map(organizerTag => {
              const member = guild.members.find(
                member => member.user.tag === organizerTag
              )

              return member.nickname || member.user.username
            })} for more information
          `
        }
      : undefined

    return {
      title: `We next run ${gameType} ${now.to(next)}`,
      description: stripIndent`
        To signup for ${gameType}, go to ${signupChannel}

        We run ${gameType} at ${time.format('h:mma')} Server Time

        ${extraMessage ? extraMessage : ''}
      `,
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
