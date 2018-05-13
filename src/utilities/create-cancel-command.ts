import { Embed, Schedule } from '../common/types'
import { Message } from 'discord.js'

import moment from 'moment'

import getGuildMember from '../utilities/get-guild-member'
import getDisplayNameForGameType from '../utilities/get-display-name-for-game-type'
import getScheduleForGameType from './get-schedule-for-game-type'
import isOfficer from '../utilities/is-officer'
import scheduleCancelDeletion from './schedule-cancel-deletion'
import changeScheduleForGameType from './change-schedule-for-game-type'

const createCancelCommand = (gameType: string): Function => {
  const gameTypeDisplayName = getDisplayNameForGameType(gameType)

  return (message: Message, [date]: [string]): Embed => {
    if (!isOfficer(getGuildMember(message.author))) {
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

    const {
      cancelledDates,
      isPermanentlyCancelled,
      schedule
    }: Schedule = getScheduleForGameType(gameType)

    if (isPermanentlyCancelled) {
      return {
        title: `We have already permanently cancelled ${gameTypeDisplayName}`
      }
    }

    // Get day number based on the day passed in
    const day = cancelledDate.day()

    // if the date passed isn't a scheduled day
    const index = schedule.findIndex(
      ({ day: scheduledDay }) => day === scheduledDay
    )

    if (index === -1) {
      return {
        title: `You provided me a day that we don't actually run ${gameTypeDisplayName}`
      }
    }

    cancelledDate.hours(schedule[index].hour).minutes(schedule[index].minute)

    // actually cancel event
    cancelledDates.push(cancelledDate.toJSON())

    changeScheduleForGameType(gameType, {
      cancelledDates: cancelledDates.sort((a, b) => {
        const c = moment(a)
        const d = moment(b)

        if (d.isBefore(c)) return 1
        if (c.isAfter(d)) return -1

        return 0
      })
    })

    scheduleCancelDeletion(gameType.toLowerCase(), cancelledDate.toJSON())

    // tell them that it was cancelled
    return {
      title: `I have cancelled ${gameTypeDisplayName} for ${cancelledDate.format(
        'MM/DD/YYYY'
      )}`
    }
  }
}

export default createCancelCommand
