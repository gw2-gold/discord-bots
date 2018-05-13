// Types
import { Embed, Schedule } from '../common/types'

import moment from 'moment'

import createScheduleMessage from '../utilities/create-schedule-message'
import getNextScheduledDay from './get-next-scheduled-day'
import getScheduleForGameType from './get-schedule-for-game-type'

const createScheduleCommand = ({
  extraMessage = '',
  gameType,
  signupChannelName
}: {
  extraMessage?: string
  gameType: string
  signupChannelName: string
}): Function => {
  const message = createScheduleMessage({
    extraMessage,
    gameType,
    signupChannelName
  })
  const fn = (): Embed => {
    const { schedule, cancelledDates }: Schedule = getScheduleForGameType(
      gameType
    )

    const now = moment.utc()
    let next = now.clone()
    next = getNextScheduledDay(schedule, cancelledDates, now, next)

    return message(now, next)
  }

  return fn
}

export default createScheduleCommand
