// Types
import { Moment } from 'moment'
import { Schedule } from '../common/types'

import moment from 'moment-timezone'

import getDisplayNameForGameType from '../utilities/get-display-name-for-game-type'
import getGuild from '../utilities/get-guild'
import { oneLineCommaListsOr, stripIndents } from 'common-tags'
import getMembersByRoleName from './get-members-by-role-name'
import getScheduleForGameType from './get-schedule-for-game-type'

const createScheduleMessage = ({
  extraMessage = '',
  gameType,
  signupChannelName
}: {
  extraMessage: string
  gameType: string
  signupChannelName: string
}): Function => {
  return function(now: Moment, next: Moment) {
    const gameTypeDisplayName = getDisplayNameForGameType(gameType)
    const {
      schedule,
      cancelledDates,
      isPermanentlyCancelled
    }: Schedule = getScheduleForGameType(gameType)

    if (isPermanentlyCancelled) {
      return {
        title: `Sadly, we have cancelled ${gameTypeDisplayName} until further notice.`
      }
    }

    const guild = getGuild()
    const signupChannel = guild.channels.find('name', signupChannelName)
    const organizers = getMembersByRoleName(
      `${gameTypeDisplayName} Coordinator`
    )

    let footer = organizers
      ? {
          text: oneLineCommaListsOr`
            Contact ${organizers.map(organizer => {
              return organizer.nickname || organizer.user.username
            })} for more information
          `
        }
      : undefined

    return {
      title: `We next run ${gameTypeDisplayName} ${now.to(next)}`,
      description: stripIndents`
        To signup for ${gameTypeDisplayName}, go to ${signupChannel}

        We run ${gameTypeDisplayName} on the following days:
        ${schedule
          .map(({ day, hour, minute }) => {
            const utc = moment.utc(`${day} ${hour}:${minute}`, 'd, h m')
            const aus = utc
              .clone()
              .tz('Australia/Brisbane')
              .format('ddd')
            const eastern = utc
              .clone()
              .tz('America/New_York')
              .format('ddd')

            return `| ${eastern} [US] / ${aus} [AU] at ${utc.format(
              'h:mma'
            )} ST`
          })
          .join('\n')}
        ${
          cancelledDates.length > 0
            ? `\nCancelled Dates:\n${cancelledDates
                .map(date => '|  ' + moment.utc(date).format('dddd MM/DD'))
                .join('\n')}\n`
            : ''
        }
        ${extraMessage ? extraMessage : ''}
      `,
      footer
    }
  }
}

export default createScheduleMessage
