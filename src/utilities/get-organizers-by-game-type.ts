/**
 * Given a game type, return the discord tags of the organizers
 @param gameType {string} A string indicating the game type. Allowed values: 'Fractals', 'Guild Missions', 'PvP', 'Raids'
 @return {string[]}
 */
const getOrganizersByGameType = (gameType: string): string[] => {
  const organizers =
    process.env[`${gameType.replace(' ', '_').toUpperCase()}_ORGANIZERS`]

  if (!organizers) {
    throw new Error(
      `process.env.${gameType.toUpperCase()}_ORGANIZERS is not defined`
    )
  }

  return organizers.split(',')
}

export default getOrganizersByGameType
