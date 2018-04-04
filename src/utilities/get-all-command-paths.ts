import { Commands } from '../common/types'

/**
 * Given an object of commands, return the paths to their related module
 * @param commands {Commands} A object of commands
 * @returns {string[]}
 */
const getAllCommandPaths = (commands: Commands): string[] => {
  return Object.keys(commands)
    .filter(commandName => commandName !== 'index')
    .reduce((accumulator, current) => {
      const hasSubCommands = Object.keys(commands[current]).includes('index')

      Array.prototype.push.apply(
        accumulator,
        !hasSubCommands
          ? [current]
          : Object.keys(commands[current]).map(
              commandName => `${current}.${commandName}`
            )
      )

      return accumulator
    }, [])
}

export default getAllCommandPaths
