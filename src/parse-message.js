const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g
const mentionsRegex = /<@.+?>/

const parseMessage = message => {
  const [command, ...rest] = message.match(regex)
  // Filter out the mentions. Mentions always start
  // with `<@` and end with `>`. This is
  const args = rest.filter(arg => !mentionsRegex.test(arg))

  return [command, args]
}

module.exports = parseMessage
