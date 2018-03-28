import { Commands } from '../common/types'

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
