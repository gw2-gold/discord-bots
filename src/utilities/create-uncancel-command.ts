// Types
import { Embed } from '../common/types'
import { Message } from 'discord.js'

import moment from 'moment'

import ensureFileExists from '../utilities/ensure-file-exists'
import getGuildMember from '../utilities/get-guild-member'
import isOfficer from '../utilities/is-officer'
import readFile from '../utilities/read-file'
import removeCancelledDate from './remove-cancelled-date'
import removeScheduledCancelDeletion from './remove-scheduled-cancel-deletion'

const createUncancelCommand = (gameType: string, gameTypeDisplay?: string) => {
  const defaultSchedule = (
    process.env[`DEFAULT_${gameType.toUpperCase()}_SCHEDULE`] || ''
  )
    .split(',')
    .map(day => Number(day))
  const scheduleFilePath = `../../files/${gameType.toLowerCase()}-schedule.json`

  return (message: Message, [date]: [string]): Embed => {
    if (!isOfficer(getGuildMember(message.author))) {
      return { title: 'Only officers are allowed to uncancel events' }
    }

    ensureFileExists(scheduleFilePath, JSON.stringify(defaultSchedule))

    let cancelledDate = moment.utc(date, 'MM/DD/YYYY')
    let { cancelledDates }: { cancelledDates: string[] } = JSON.parse(
      readFile(scheduleFilePath) || '{}'
    )

    let cancelledDateString: string | undefined = cancelledDates.find(
      cancelledDateJSON => {
        return cancelledDate.isSame(cancelledDateJSON, 'day')
      }
    )

    if (!cancelledDateString) {
      return { title: "This date wasn't previously cancelled" }
    }

    removeCancelledDate(gameType.toLowerCase(), cancelledDateString)
    removeScheduledCancelDeletion(gameType.toLowerCase(), cancelledDateString)

    return {
      title: `I have uncancelled ${
        gameTypeDisplay ? gameTypeDisplay : gameType
      } for ${cancelledDate.format('MM/DD/YYYY')}`
    }
  }
}
export default createUncancelCommand
