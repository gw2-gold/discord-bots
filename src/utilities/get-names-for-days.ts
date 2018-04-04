import moment from 'moment'

/**
 * Given a schedule of days of the week, return their localized names
 * @param schedule {number[]} An array of numbers, each value from 0 (Sunday) to 6 (Saturday)
 * @param suffix {string} Suffix to end the string of day names with
 * @param shiftDayBy {number} A number indicating the amount of days to shift forward or backward. Useful if listing days in a different timezone
 * @return {string}
 */
const getNamesForDays = (
  schedule: number[],
  suffix: string,
  shiftDayBy: number = 0
): string => {
  return (
    schedule.reduce((prev, curr, currIndex, array) => {
      const isTwoFromEnd = currIndex === array.length - 2
      const isOneFromEnd = currIndex === array.length - 1

      return (
        prev +
        moment
          .utc()
          .day(curr + shiftDayBy)
          .format('dddd') +
        (isTwoFromEnd ? ' and ' : '') +
        (isOneFromEnd || isTwoFromEnd ? '' : ', ')
      )
    }, '') + ` ${suffix}`
  )
}

export default getNamesForDays
