// Types
import { Embed } from '../common/types'

import moment from 'moment'

import createMessage from '../utilities/create-message'
import getNextScheduledDay from './get-next-scheduled-day'
/**
 * Create a command that returns a message about the schedule for a particular game type
 * @param signupChannelName {string} A string indicating the name of the channel used for signups
 * @param gameType {string} A string indicating the game type. Allowed values: 'Fractals', 'Guild Missions', 'PvP', 'Raids'
 * @param startHours {number} A number from 0 - 24 indicating the hour at which an event starts
 * @param startMinutes {number} A number from 0 - 59 indicating the minutes at which an event starts
 * @param schedule {number[]} An array of numbers, 0 (Sunday) - 6 (Saturday), each indicating a day of the week an even runs
 * @param extraMessage {string} A string indicating an extra message to be printed before the dates that get listed
 * @param organizerTags {string[]} An array of organizer discord tags to be put in the footer of the message
 * @return {Function}
 */
const createScheduleCommand = (
  signupChannelName: string,
  gameType: string,
  startHours: number,
  startMinutes: number,
  schedule: number[],
  extraMessage: string,
  organizerTags: string[]
): Function => {
  const message = createMessage(
    signupChannelName,
    gameType,
    startHours,
    startMinutes,
    extraMessage,
    schedule,
    organizerTags
  )
  const fn = (): Embed => {
    const now = moment.utc()
    let next = now
      .clone()
      .hours(startHours)
      .minutes(startMinutes)
      .seconds(0)
    const nextDay = getNextScheduledDay(schedule, now, next)

    next = next.day(nextDay)

    return message(now, next)
  }

  return fn
}

export default createScheduleCommand
