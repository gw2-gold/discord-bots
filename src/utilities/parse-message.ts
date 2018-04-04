const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g
const mentionsRegex = /<@.+?>/g

/**
 * Given a messages contents, parse out the command and arguments
 * @param message {string} The message contents
 */
const parseMessage = (message: string): [string, string[]] => {
  const messageWithoutMentions = message.replace(mentionsRegex, '')
  const matches: string[] = <string[]>messageWithoutMentions.match(regex)

  if (!matches) {
    console.warn(`Unable to parse the message: ${message}`)

    return ['', ['']]
  }

  const [command, ...args] = matches
  const ret: [string, string[]] = [command.toLowerCase(), args]

  return ret
}

export default parseMessage
