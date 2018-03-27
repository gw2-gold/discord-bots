// Types
import { Embed } from './common/types'

import moment from 'moment'
import getNextScheduledDay from './get-next-scheduled-day'

const createScheduleCommand = (
  startHour: number,
  startMinutes: number,
  schedule: number[],
  createMessage: Function
): Function => {
  const fn = (): Embed => {
    const now = moment.utc()
    let nextFractals = now
      .clone()
      .hours(startHour)
      .minutes(startMinutes)
      .seconds(0)
    const nextDay = getNextScheduledDay(schedule, now, nextFractals)

    nextFractals = nextFractals.day(nextDay)

    return createMessage(now, nextFractals)
  }

  return fn
}

export default createScheduleCommand
