// Types
import { GuildMember, Role } from 'discord.js'

if (!process.env.OFFICER_ROLES) {
  throw new Error(
    'OFFICER_ROLES is undefined in the .env file. This is required'
  )
}

const LEADER_ROLE: string = process.env.OFFICER_ROLES.split(', ')[0]

const isLeader = (guildMember: GuildMember) => {
  const role: Role = guildMember.roles.find(role => role.name === LEADER_ROLE)

  return role != undefined
}

export default isLeader
