// Types
import { TextChannel } from 'discord.js'
import { Embed, RaidSignups, Command } from '../../common/types'

import getGuild from '../../get-guild'

const description =
  "I'll send you the members that are currently signed up for the next, along with the classes/elite specs they are willing to play"
const shouldDM = false

async function fn(): Promise<Embed> {
  const guild = getGuild()

  const raidSignupChannel: TextChannel = <TextChannel>guild.channels.find(
    'name',
    'raid-signup'
  )
  const messages = await raidSignupChannel.fetchMessages()
  const raidSignupMessage = messages.first()
  const reactions = raidSignupMessage.reactions
    .array()
    .filter(reaction => guild.emojis.find('name', reaction.emoji.name))
  const signups: RaidSignups = {}

  if (reactions.length === 0) {
    return {
      title: 'No on has signed up for the next raid session yet!'
    }
  }

  for (let reaction of reactions) {
    const users = await reaction.fetchUsers()
    const members = users.array().map(user => guild.members.find('id', user.id))

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

  return { title: 'Here are the current signups for the next raid', fields }
}

const command: Command = { description, fn, shouldDM }

export default command
