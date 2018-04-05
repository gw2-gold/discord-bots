import { Moment } from 'moment'

/**
 * Given a schedule and the next time, find the next closest day in the schedule
 * @param schedule {number[]} An array of numbers, 0 (Sunday) - 6 (Saturday), each indicating a day of the week an even runs
 * @param now {Moment} A moment object representing the current time
 * @param nextTime {Moment} A moment object representing the time of the next day
 * @returns number
 */
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
