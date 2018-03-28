import moment from 'moment'

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
