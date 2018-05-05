// Types
import { Moment } from 'moment'
import { ScheduledDay } from '../common/types'

import moment from 'moment-timezone'

import getGuild from '../utilities/get-guild'
import { oneLineCommaListsOr, stripIndents } from 'common-tags'
import getMembersByRoleName from './get-members-by-role-name'
import readFile from './read-file'

const createScheduleMessage = ({
  extraMessage = '',
  gameType,
  schedulePath,
  signupChannelName
}: {
  extraMessage: string
  gameType: string
  schedulePath: string
  signupChannelName: string
}): Function => {
  return function(now: Moment, next: Moment) {
    const {
      schedule,
      cancelledDates
    }: { schedule: ScheduledDay[]; cancelledDates: string[] } = JSON.parse(
      readFile(schedulePath) || '[]'
    )
    const guild = getGuild()
    const signupChannel = guild.channels.find('name', signupChannelName)
    const organizers = getMembersByRoleName(`${gameType} Coordinator`)

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
      title: `We next run ${gameType} ${now.to(next)}`,
      description: stripIndents`
        To signup for ${gameType}, go to ${signupChannel}

        We run ${gameType} on the following days:
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
