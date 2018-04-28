import { GuildMember, TextChannel } from 'discord.js'

import { embedColor } from '../utilities/constants'
import getGuild from '../utilities/get-guild'

const onGuildMemberUpdate = (
  oldMember: GuildMember,
  newMember: GuildMember
) => {
  if (oldMember.nickname === newMember.nickname) {
    return
  }

  const guild = getGuild()
  const channel = <TextChannel>guild.channels.find('name', 'officers')

  channel.send({
    embed: {
      title: `${oldMember.nickname} changed their nickname to ${
        newMember.nickname
      }`,
      color: embedColor
    }
  })
}

export default onGuildMemberUpdate
