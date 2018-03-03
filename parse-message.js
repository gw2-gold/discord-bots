const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g

const parseMessage = message => {
  const [command, ...args] = message.match(regex)

  return [command, args]
}

module.exports = parseMessage
