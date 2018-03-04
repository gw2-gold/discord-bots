const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g

const parseMessage = message => {
  const [command, ...rest] = message.match(regex)
  const args = rest.filter(arg => !/<@.+?>/.test(arg))

  return [command, args]
}

module.exports = parseMessage
