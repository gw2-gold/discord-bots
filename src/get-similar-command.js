const natural = require('natural')
const commands = require('./commands')

const getSimilarCommand = command => {
  const commandNames = Object.keys(commands)
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

module.exports = getSimilarCommand
