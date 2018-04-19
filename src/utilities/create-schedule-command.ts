// Types
import { Embed, ScheduledDay } from '../common/types'

import moment from 'moment'

import createScheduleMessage from '../utilities/create-schedule-message'
import getNextScheduledDay from './get-next-scheduled-day'
import readFile from './read-file'

const createScheduleCommand = ({
  extraMessage = '',
  gameType,
  schedulePath,
  signupChannelName
}: {
  extraMessage?: string
  gameType: string
  schedulePath: string
  signupChannelName: string
}): Function => {
  const message = createScheduleMessage({
    extraMessage,
    gameType,
    schedulePath,
    signupChannelName
  })
  const fn = (): Embed => {
    const {
      schedule,
      cancelledDates
    }: { schedule: ScheduledDay[]; cancelledDates: string[] } = JSON.parse(
      readFile(schedulePath) || '[]'
    )

    const now = moment.utc()
    let next = now.clone()
    next = getNextScheduledDay(schedule, cancelledDates, now, next)

    // next = next.day(nextDay)

    return message(now, next)
  }

  return fn
}

export default createScheduleCommand
