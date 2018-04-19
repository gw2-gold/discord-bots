import { User } from 'discord.js'

import getGuild from './get-guild'

const getGuildMember = (user: User) => {
  return getGuild().members.find(member => member.user.id === user.id)
}

export default getGuildMember
