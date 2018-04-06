// Types
import { Moment } from 'moment'

import moment from 'moment'

import getGuild from '../utilities/get-guild'
import getNamesForDays from '../utilities/get-names-for-days'
import {
  oneLineCommaListsAnd,
  oneLineCommaListsOr,
  stripIndent
} from 'common-tags'
import getMembersByRoleName from './get-members-by-role-name'

const createScheduleMessage = ({
  extraMessage = '',
  gameType,
  signupChannelName,
  startHours,
  startMinutes,
  schedule
}: {
  signupChannelName: string
  gameType: string
  startHours: number
  startMinutes: number
  extraMessage: string
  schedule: number[]
}): Function => {
  return function(now: Moment, next: Moment) {
    const guild = getGuild()
    const signupChannel = guild.channels.find('name', signupChannelName)
    const organizers = getMembersByRoleName(`${gameType} Coordinator`)
    const time = moment
      .utc()
      .hours(startHours)
      .minutes(startMinutes)
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
      description: stripIndent`
        To signup for ${gameType}, go to ${signupChannel}

        We run ${gameType} at ${time.format('h:mma')} Server Time

        ${extraMessage ? extraMessage : ''}
      `,
      fields: [
        {
          name: '[US/Can/Alaska]',
          value: oneLineCommaListsAnd`${getNamesForDays(schedule, -1)} Evening`
        },
        {
          name: '[OcX/SEA]',
          value: oneLineCommaListsAnd`${getNamesForDays(schedule)} Morning`
        }
      ],
      footer
    }
  }
}

export default createScheduleMessage
