import { Moment } from 'moment'
import { ScheduledDay } from '../common/types'

import moment from 'moment'

const getNextScheduledDay = (
  schedule: ScheduledDay[],
  cancelledDates: string[],
  now: Moment,
  nextTime: Moment
): Moment => {
  let next

  for (let n of schedule) {
    const nextDay = nextTime
      .clone()
      .day(n.day)
      .hours(n.hour)
      .minutes(n.minute)
      .seconds(0)
      .milliseconds(0)

    if (cancelledDates.includes(nextDay.toJSON())) {
      continue
    }

    if (now.isAfter(nextDay)) {
      continue
    }

    if (now.isBefore(nextDay)) {
      next = nextDay

      break
    }
  }

  if (!next) {
    const a = moment.utc()
    let i = 0
    let numberOfWeeks = 0
    while (true) {
      const { day, hour, minute } = schedule[i % schedule.length]
      const b = a
        .clone()
        .day(day + 7 * numberOfWeeks)
        .hours(hour)
        .minutes(minute)
        .seconds(0)
        .milliseconds(0)

      i++

      if (i % schedule.length === 0) {
        numberOfWeeks++
      }

      if (b.isAfter(a) && !cancelledDates.includes(b.toJSON())) {
        next = b

        break
      }
    }
  }

  return next
}

export default getNextScheduledDay
