// Types
import { GuildMember, TextChannel } from 'discord.js'
import { Embed } from '../common/types'

import { stripIndent } from 'common-tags'

const { embedColor } = require('../utilities/constants')

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
    embed: <Embed>{
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
        'In order to make it easier for everyone to get to know you, please follow the directions below to change your nickname',
      fields: [
        {
          name: 'Steps to change your nickname:',
          value: stripIndent`
            |  Click the [GOLD] server from your list of servers on the left side of discord
            |  Click the down arrow next to "Wealth Of Heroes [GOLD]" above the channels list
            |  Click "Change Nickname"
          `
        },
        {
          name: 'Example nicknames for account name "Leo.1234"',
          value: stripIndent`
            |  Leo.1234
            |  Leo
            |  A Name You Choose / Leo
            |  A Name You Choose (Leo)
          `
        }
      ],
      color: embedColor
    }
  })
}

export default onGuildMemberAdd
