// Types
import { GuildMember, Role } from 'discord.js'

const officerRoles = ['Grand Master', 'High Councillor', 'Kings Guard']

const isOfficer = (guildMember: GuildMember) => {
  const role: Role = guildMember.roles.find(role =>
    officerRoles.includes(role.name)
  )

  return role != undefined
}

export default isOfficer
