// Types
import { GuildMember, TextChannel } from 'discord.js'
import { Embed } from './common/types'

const { embedColor, tab } = require('./constants')

const onGuildMemberAdd = (member: GuildMember) => {
  const isBot = member.user.bot
  const channel: TextChannel = <TextChannel>member.guild.channels.find(
    'name',
    'general'
  )

  // If we can't find the channel, for some reason,
  // or the message is from a bot, ignore it.
  // We don't want to respond to ourselves or to other bots.
  if (!channel || isBot) return

  // Send a message to everyone in #general to welcome the player
  // and also ask the new person to check their DMs
  channel.send({
    embed: {
      title: `Everyone, please welcome ${member.user.username} to the family!`,
      description: `${
        member.user.username
      }, please check your DMs for a message from me!`,
      color: embedColor
    }
  })

  // Send the new member a DM to welcome them and ask them to
  // change their nickname to include their GW2 account name
  member.send({
    embed: <Embed>{
      title: `Welcome to the [GOLD] family ${member.user.username}!`,
      description:
        'In order to make it easier for everyone to get to know you, please follow the directions below to change your nickname?',
      fields: [
        {
          name: 'Steps to change your nickname:',
          value: [
            `|${tab}Click the [GOLD] server from your list of servers on the left side of discord`,
            `|${tab}Click the down arrow next to "Wealth of Heroes [GOLD]" above the channels list`,
            `|${tab}Click "Change Nickname"`
          ].join('\n')
        },
        {
          name: 'Example nicknames for account name "Leo.1234"',
          value: [
            `|${tab}Leo.1234`,
            `|${tab}Leo`,
            `|${tab}A Name you Choose/Leo`,
            `|${tab}A Name you Choose (Leo)`
          ].join('\n')
        }
      ],
      color: embedColor
    }
  })
}

export default onGuildMemberAdd
