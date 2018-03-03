// Takes a GuildMember object from the discord API
const isOfficer = guildMember => {
  const role = guildMember.roles.find(role => {
    return (
      role.name === 'Grand Master' ||
      role.name === 'High Councillor' ||
      role.name === 'Kings Guard'
    )
  })

  return role != undefined
}

module.exports = isOfficer
