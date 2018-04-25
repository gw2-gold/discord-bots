// Types
import { GuildMember, Role } from 'discord.js'

if (!process.env.OFFICER_ROLES) {
  throw new Error(
    'OFFICER_ROLES is undefined in the .env file. This is required'
  )
}

const OFFICER_ROLES: string[] = process.env.OFFICER_ROLES.split(', ')

const isOfficer = (guildMember: GuildMember) => {
  const role: Role = guildMember.roles.find(role =>
    OFFICER_ROLES.includes(role.name)
  )

  return role != undefined
}

export default isOfficer
