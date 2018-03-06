const officerRoles = ['Grand Master', 'High Councillor', 'Kings Guard']

// Takes a GuildMember object from the discord API
const isOfficer = guildMember => {
  const role = guildMember.roles.find(role => officerRoles.includes(role.name))

  return role != undefined
}

module.exports = isOfficer
