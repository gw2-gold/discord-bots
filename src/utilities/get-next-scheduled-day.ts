import { Moment } from 'moment'

const getNextScheduledDay = (
  schedule: number[],
  now: Moment,
  nextTime: Moment
): number => {
  let next

  for (let n of schedule) {
    const nextDay = nextTime.clone().day(n)

    if (now.isAfter(nextDay)) {
      continue
    }

    if (now.isBefore(nextDay)) {
      next = nextDay.day()

      break
    }
  }

  if (!next) {
    next = schedule[0]
  }

  return next < now.day() ? next + 7 : next
}

export default getNextScheduledDay
