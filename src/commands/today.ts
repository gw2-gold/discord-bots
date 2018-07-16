// Types
import { Command, ScheduledDay } from '../common/types'

import getDisplayNameForGameType from '../utilities/get-display-name-for-game-type'
import getScheduleForGameType from '../utilities/get-schedule-for-game-type'
import moment from 'moment-timezone'

const description =
  "I'll send you the events and their times for the next 24 hours"
const fn = () => {
  let scheduledGameTypes: { [key: string]: ScheduledDay } = {}
  ;['Fractal', 'Mission', 'PvP', 'Raid', 'WvW'].forEach(gameType => {
    const gameTypeDisplayName = getDisplayNameForGameType(gameType)
    const {
      cancelledDates,
      isPermanentlyCancelled,
      schedule
    } = getScheduleForGameType(gameType)
    const day = moment.utc().day()
    const foundDay = schedule.find(({ day, hour, minute }) => {
      const now = moment.utc()
      const nextEvent = moment.utc(`${day} ${hour}:${minute}`, 'd h:m')
      const hoursUntilEvent = nextEvent.diff(now, 'hour')

      return hoursUntilEvent >= 0 && hoursUntilEvent <= 24
    })

    const isCancelled = cancelledDates.find(dateString => {
      const date = moment.utc(dateString)

      return date.day() === day
    })

    if (!foundDay || isCancelled || isPermanentlyCancelled) {
      return
    }

    scheduledGameTypes = {
      ...scheduledGameTypes,
      [gameTypeDisplayName]: foundDay
    }
  })

  return {
    title: 'Here is a list of events that are happening in the next 24 hours',
    description: Object.keys(scheduledGameTypes)
      .map((gameType: string) => {
        const { day, hour, minute } = scheduledGameTypes[gameType]
        const utc = moment.utc(`${day} ${hour}:${minute}`, 'd h:m')

        return `| ${gameType} at ${utc.format('h:mma')} ST`
      })
      .join('\n')
  }
}
const shouldDM = false

const command: Command = { description, fn, shouldDM }

export default command
