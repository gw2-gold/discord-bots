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
      next = nextDay

      break
    }
  }

  if (!next) {
    next = nextTime.clone().day(schedule[0])
  }

  return now.isAfter(next) ? next.day() + 7 : next.day()
}

export default getNextScheduledDay
