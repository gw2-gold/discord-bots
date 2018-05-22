import ensureFileExists from './ensure-file-exists'
import getScheduleForGameType from './get-schedule-for-game-type'
import writeFile from './write-file'
import { ScheduledDay } from '../common/types'

const changeScheduleForGameType = (
  gameType: string,
  changes: {
    schedule?: ScheduledDay[]
    cancelledDates?: string[]
    isPermanentlyCancelled?: boolean
  }
) => {
  const defaultSchedule = (
    process.env[`DEFAULT_${gameType.toUpperCase()}_SCHEDULE`] || ''
  )
    .split(',')
    .map(day => Number(day))
  const scheduleFileName = `${gameType.toLowerCase()}-schedule.json`

  // Load schedule file
  ensureFileExists(scheduleFileName, JSON.stringify(defaultSchedule))

  const schedule = getScheduleForGameType(gameType)

  writeFile(
    scheduleFileName,
    JSON.stringify(Object.assign({}, schedule, changes))
  )
}

export default changeScheduleForGameType
