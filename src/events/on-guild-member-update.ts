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

  const oldName = oldMember.nickname || oldMember.user.username
  const newName = newMember.nickname || newMember.user.username

  channel.send({
    embed: {
      title: `${oldName} changed their nickname to ${newName}`,
      color: embedColor
    }
  })
}

export default onGuildMemberUpdate
