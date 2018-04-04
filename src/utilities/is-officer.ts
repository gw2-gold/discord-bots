// Types
import { GuildMember, Role } from 'discord.js'

const officerRoles = ['Grand Master', 'High Councillor', 'Kings Guard']

/**
 * Given a GuildMember, return whether or not they are an officer
 * @param guildMember {GuildMember} The member of the guild to check permissions for
 * @return {boolean}
 */
const isOfficer = (guildMember: GuildMember) => {
  const role: Role = guildMember.roles.find(role =>
    officerRoles.includes(role.name)
  )

  return role != undefined
}

export default isOfficer
