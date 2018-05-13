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
  const scheduleFilePath = `../../files/${gameType.toLowerCase()}-schedule.json`

  // Load schedule file
  ensureFileExists(scheduleFilePath, JSON.stringify(defaultSchedule))

  const schedule: Schedule = JSON.parse(readFile(scheduleFilePath) || '{}')

  return schedule
}

export default getScheduleForGameType
