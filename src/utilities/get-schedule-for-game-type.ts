// Types
import { Schedule } from '../common/types'

import ensureFileExists from './ensure-file-exists'
import readFile from './read-file'

const getScheduleForGameType = (gameType: string): Schedule => {
  const defaultSchedule = (
    process.env[`DEFAULT_${gameType.toUpperCase()}_SCHEDULE`] || ''
  )
    .split(',')
    .map(day => Number(day))
  const scheduleFileName = `${gameType.toLowerCase()}-schedule.json`

  // Load schedule file
  ensureFileExists(scheduleFileName, JSON.stringify(defaultSchedule))

  const schedule: Schedule = JSON.parse(readFile(scheduleFileName) || '{}')

  return schedule
}

export default getScheduleForGameType
