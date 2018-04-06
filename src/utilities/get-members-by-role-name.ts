// Types
import { GuildMember } from 'discord.js'

import getGuild from './get-guild'

const getMembersByRoleName = (roleName: string): GuildMember[] => {
  const guild = getGuild()

  return guild.members.array().filter(member => {
    return member.roles.find('name', roleName) !== null
  })
}

export default getMembersByRoleName
