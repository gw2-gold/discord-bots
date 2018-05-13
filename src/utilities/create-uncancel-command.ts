// Types
import { Embed, Schedule } from '../common/types'
import { Message } from 'discord.js'

import moment from 'moment'

import getDisplayNameForGameType from './get-display-name-for-game-type'
import getGuildMember from '../utilities/get-guild-member'
import isOfficer from '../utilities/is-officer'
import removeCancelledDate from './remove-cancelled-date'
import removeScheduledCancelDeletion from './remove-scheduled-cancel-deletion'
import getScheduleForGameType from './get-schedule-for-game-type'

const createUncancelCommand = (gameType: string) => {
  const gameTypeDisplayName = getDisplayNameForGameType(gameType)

  return (message: Message, [date]: [string]): Embed => {
    if (!isOfficer(getGuildMember(message.author))) {
      return { title: 'Only officers are allowed to uncancel events' }
    }

    let cancelledDate = moment.utc(date, 'MM/DD/YYYY')
    let {
      cancelledDates,
      isPermanentlyCancelled
    }: Schedule = getScheduleForGameType(gameType)

    if (isPermanentlyCancelled) {
      return {
        title: `Sadly, we have permanently cancelled ${gameTypeDisplayName} until further notice`
      }
    }

    let cancelledDateString: string | undefined = cancelledDates.find(
      cancelledDateJSON => {
        return cancelledDate.isSame(cancelledDateJSON, 'day')
      }
    )

    if (!cancelledDateString) {
      return { title: "This date wasn't previously cancelled" }
    }

    removeCancelledDate(gameType.toLowerCase(), cancelledDateString)
    removeScheduledCancelDeletion(gameType.toLowerCase(), cancelledDateString)

    return {
      title: `I have uncancelled ${gameTypeDisplayName} for ${cancelledDate.format(
        'MM/DD/YYYY'
      )}`
    }
  }
}
export default createUncancelCommand
