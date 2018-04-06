import moment from 'moment'

const getNamesForDays = (
  schedule: number[],
  shiftDayBy: number = 0
): string[] => {
  return schedule.map(day => {
    return moment
      .utc()
      .day(day + shiftDayBy)
      .format('dddd')
  })
}

export default getNamesForDays
