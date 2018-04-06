import natural from 'natural'
import commands from '../commands'

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
