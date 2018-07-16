// Types
import { Command, ScheduledDay } from '../common/types'

import getDisplayNameForGameType from '../utilities/get-display-name-for-game-type'
import getScheduleForGameType from '../utilities/get-schedule-for-game-type'
import moment from 'moment-timezone'

const description =
  "I'll send you general time info about Raids as well as how long it is until the next Raid"
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
    const foundDay = schedule.find(scheduledDay => {
      return scheduledDay.day === day
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
    title: 'Here is a list of events that are happening today',
    description: Object.keys(scheduledGameTypes)
      .map((gameType: string) => {
        const { day, hour, minute } = scheduledGameTypes[gameType]
        const utc = moment.utc(`${day} ${hour}:${minute}`, 'd, h m')

        return `| ${gameType} at ${utc.format('h:mma')} ST`
      })
      .join('\n')
  }
}
const shouldDM = false

const command: Command = { description, fn, shouldDM }

export default command
