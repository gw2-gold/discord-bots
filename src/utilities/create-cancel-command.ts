import { Embed, ScheduledDay } from '../common/types'
import { Message } from 'discord.js'

import moment from 'moment'

import isOfficer from '../utilities/is-officer'
import ensureFileExists from '../utilities/ensure-file-exists'
import readFile from '../utilities/read-file'
import writeFile from '../utilities/write-file'
import scheduleCancelDeletion from './schedule-cancel-deletion'

const createCancelCommand = (
  gameType: string,
  gameTypeDisplay?: string
): Function => {
  const defaultSchedule = (
    process.env[`DEFAULT_${gameType.toUpperCase()}_SCHEDULE`] || ''
  )
    .split(',')
    .map(day => Number(day))
  const scheduleFilePath = `../../files/${gameType.toLowerCase()}-schedule.json`
  return (message: Message, [date]: [string]): Embed => {
    if (!isOfficer(message.member)) {
      return { title: 'Only Officers are allowed to cancel events' }
    }

    if (!date) {
      return {
        title: 'You must provide a date to cancel'
      }
    }

    // We shouldn't let the user pass in a date thats before the current date
    let cancelledDate = moment.utc(date, 'MM/DD/YYYY')

    if (moment.utc().diff(cancelledDate, 'hours') >= 2) {
      return {
        title:
          "You can't provide a date for an event thats over 2 hours in the past"
      }
    }

    // Load schedule file
    ensureFileExists(scheduleFilePath, JSON.stringify(defaultSchedule))
    const {
      schedule,
      cancelledDates
    }: { schedule: ScheduledDay[]; cancelledDates: string[] } = JSON.parse(
      readFile(scheduleFilePath) || '{}'
    )

    // Get day number based on the day passed in
    const day = cancelledDate.day()

    // if the date passed isn't a scheduled day
    const index = schedule.findIndex(
      ({ day: scheduledDay }) => day === scheduledDay
    )

    if (index === -1) {
      return {
        title: `You provided me a day that we don't actually run ${
          gameTypeDisplay ? gameTypeDisplay : gameType
        }`
      }
    }

    cancelledDate.hours(schedule[index].hour).minutes(schedule[index].minute)

    // actually cancel event
    cancelledDates.push(cancelledDate.toJSON())

    writeFile(
      scheduleFilePath,
      JSON.stringify({
        schedule,
        cancelledDates: cancelledDates.sort((a, b) => {
          const c = moment(a)
          const d = moment(b)

          if (d.isBefore(c)) return 1
          if (c.isAfter(d)) return -1

          return 0
        })
      })
    )

    scheduleCancelDeletion(gameType.toLowerCase(), cancelledDate.toJSON())

    // tell them that it was cancelled
    return {
      title: `I have cancelled ${
        gameTypeDisplay ? gameTypeDisplay : gameType
      } for ${cancelledDate.format('MM/DD/YYYY')}`
    }
  }
}

export default createCancelCommand
