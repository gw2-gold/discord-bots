// Types
import { Embed } from '../common/types'

import moment from 'moment'

import createScheduleMessage from '../utilities/create-schedule-message'
import getNextScheduledDay from './get-next-scheduled-day'

const createScheduleCommand = ({
  extraMessage = '',
  gameType,
  signupChannelName,
  startHours,
  startMinutes,
  schedule
}: {
  extraMessage?: string
  gameType: string
  schedule: number[]
  signupChannelName: string
  startHours: number
  startMinutes: number
}): Function => {
  const message = createScheduleMessage({
    extraMessage,
    gameType,
    schedule,
    signupChannelName,
    startHours,
    startMinutes
  })
  const fn = (): Embed => {
    const now = moment.utc()
    let next = now
      .clone()
      .hours(startHours)
      .minutes(startMinutes)
      .seconds(0)
    const nextDay = getNextScheduledDay(schedule, now, next)

    next = next.day(nextDay)

    return message(now, next)
  }

  return fn
}

export default createScheduleCommand
