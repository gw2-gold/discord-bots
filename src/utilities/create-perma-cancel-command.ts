import { Message } from 'discord.js'

import changeScheduleForGameType from './change-schedule-for-game-type'
import getDisplayNameForGameType from './get-display-name-for-game-type'
import getGuildMember from '../utilities/get-guild-member'
import getScheduleForGameType from './get-schedule-for-game-type'
import isLeader from '../utilities/is-leader'

const createPermaCancelCommand = (gameType: string): Function => {
  return (message: Message, [startOrStop]: [string]) => {
    if (!isLeader(getGuildMember(message.author))) {
      return { title: 'Only Leaders are allowed to perma-cancel events' }
    }

    if (!['start', 'stop'].includes(startOrStop)) {
      return { title: 'You must put start or stop to the end of the command' }
    }

    const gameTypeDisplayName = getDisplayNameForGameType(gameType)
    const shouldStart = startOrStop === 'start'
    const { isPermanentlyCancelled } = getScheduleForGameType(gameType)

    if (isPermanentlyCancelled && shouldStart) {
      return {
        title: `Someone has already permanently cancelled ${gameTypeDisplayName}`
      }
    }

    changeScheduleForGameType(gameType, { isPermanentlyCancelled: shouldStart })

    if (shouldStart) {
      return {
        title: `I have permanently cancelled ${gameTypeDisplayName}`
      }
    }

    return { title: `I have resumed ${gameTypeDisplayName}` }
  }
}

export default createPermaCancelCommand
