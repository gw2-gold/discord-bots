import { Command, Commands } from '../common/types'

/**
 * Check to see if a command name has relevant sub commands based on a Commands object
 * @param commands {Commands} An object representing a group of commands to check against
 * @param commandName {string} The command name to check for
 * @return {boolean}
 */
const commandHasSubCommand = (commands: Commands, commandName: string) => {
  const command = commands[commandName]

  return (
    (<Command>command).description === undefined &&
    (<Command>command).fn === undefined &&
    (<Command>command).shouldDM === undefined
  )
}

export default commandHasSubCommand
