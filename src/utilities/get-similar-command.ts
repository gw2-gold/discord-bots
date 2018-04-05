import natural from 'natural'
import commands from '../commands'

/**
 * Given a command name and an optional parent command name, get the most similar command
 * @param command {string} The name of the command to look for
 * @param parentCommand {string | undefined} The name of the parent command, if needed
 * @returns string
 */
const getSimilarCommand = (
  command: string,
  parentCommand?: string
): string | undefined => {
  const commandNames = Object.keys(
    parentCommand ? commands[parentCommand] : commands
  )
  let closestMatch
  let closestMatchPercentage = 0

  commandNames.forEach(commandName => {
    const match = natural.JaroWinklerDistance(commandName, command)

    if (match > 0.89 && match > closestMatchPercentage) {
      closestMatch = commandName
      closestMatchPercentage = match
    }
  })

  return closestMatch
}

export default getSimilarCommand
