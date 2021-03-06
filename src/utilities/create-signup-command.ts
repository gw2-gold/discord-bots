// Types
import { Embed, MemberSignups, Schedule } from '../common/types'
import { TextChannel } from 'discord.js'

import getGuild from './get-guild'
import getScheduleForGameType from './get-schedule-for-game-type'
import getDisplayNameForGameType from './get-display-name-for-game-type'

const createSignupCommand = (
  gameType: string,
  noSignupsTitle: string,
  title: string
): Function => {
  return async function fn(): Promise<Embed> {
    const gameTypeDisplayName = getDisplayNameForGameType(gameType)
    const guild = getGuild()
    const { isPermanentlyCancelled }: Schedule = getScheduleForGameType(
      gameType
    )

    if (isPermanentlyCancelled) {
      return {
        title: `Sadly, we have cancelled ${gameTypeDisplayName} until further notice`
      }
    }

    const pvpSignupChannel: TextChannel = <TextChannel>guild.channels.find(
      'name',
      `${gameType.toLowerCase()}-signup`
    )
    const messages = await pvpSignupChannel.fetchMessages()
    const pvpSignupMessage = messages.first()
    const reactions = pvpSignupMessage.reactions
      .array()
      .filter(reaction => guild.emojis.find('name', reaction.emoji.name))
    const signups: MemberSignups = {}

    if (reactions.length === 0) {
      return {
        title: noSignupsTitle
      }
    }

    for (let reaction of reactions) {
      const users = await reaction.fetchUsers()
      const members = users
        .array()
        .map(user => guild.members.find('id', user.id))

      members.forEach(member => {
        // If we haven't found a signup from this user yet,
        // create an entry for them in the signups object
        if (!signups[member.user.id]) {
          signups[member.user.id] = {
            name: member.nickname || member.user.username,
            emojis: [reaction.emoji]
          }

          return
        }

        // If we have seen this user before,
        // push a new emoji into their entry
        signups[member.user.id].emojis.push(reaction.emoji)
      })
    }

    const fields = Object.keys(signups).map(userId => {
      const signup = signups[userId]

      return {
        inline: true,
        name: signup.name,
        value: signup.emojis.join(' ')
      }
    })

    return {
      title,
      fields
    }
  }
}

export default createSignupCommand
