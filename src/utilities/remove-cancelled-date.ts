// Types
import { Schedule } from '../common/types'

import changeScheduleForGameType from './change-schedule-for-game-type'
import getScheduleForGameType from './get-schedule-for-game-type'

const removeCancelledDate = (gameType: string, cancelledDate: string) => {
  const { cancelledDates }: Schedule = getScheduleForGameType(gameType)
  const index = cancelledDates.findIndex(
    (date: string) => date === cancelledDate
  )

  cancelledDates.splice(index, 1)

  changeScheduleForGameType(gameType, { cancelledDates })
}

export default removeCancelledDate
