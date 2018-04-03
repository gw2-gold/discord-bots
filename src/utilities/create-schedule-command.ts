// Types
import { Embed } from '../common/types'

import moment from 'moment'

import createMessage from '../utilities/create-message'
import getNextScheduledDay from './get-next-scheduled-day'

const createScheduleCommand = (
  signupChannelName: string,
  type: string,
  startHour: number,
  startMinutes: number,
  schedule: number[],
  extraMessage: string,
  organizerTags: string[]
): Function => {
  const message = createMessage(
    signupChannelName,
    type,
    startHour,
    startMinutes,
    extraMessage,
    schedule,
    organizerTags
  )
  const fn = (): Embed => {
    const now = moment.utc()
    let next = now
      .clone()
      .hours(startHour)
      .minutes(startMinutes)
      .seconds(0)
    const nextDay = getNextScheduledDay(schedule, now, next)

    next = next.day(nextDay)

    return message(now, next)
  }

  return fn
}

export default createScheduleCommand
