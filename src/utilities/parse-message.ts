//Types

const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g
const mentionsRegex = /<@.+?>/

const parseMessage = (message: string): [string, string[]] => {
  const matches: string[] = <string[]>message.match(regex)

  if (!matches) {
    console.warn(`could not parse the message: ${message}`)

    return ['', ['']]
  }

  const [command, ...rest] = matches
  // Filter out the mentions. Mentions always start
  // with `<@` and end with `>`. This is
  const args = rest.filter(arg => !mentionsRegex.test(arg))

  const ret: [string, string[]] = [command.toLowerCase(), args]

  return ret
}

export default parseMessage
