const { COMMAND_CHARACTER } = process.env
const commandRegex = new RegExp(`${'\\' + COMMAND_CHARACTER}\\w+`)
const argsRegex = /[^\s"']+|"([^"]*)"|'([^']*)'/g
const mentionsRegex = /<@.+?>/g

const parseMessage = (message: string): [string, string[]] => {
  const messageWithoutMentions = message.replace(mentionsRegex, '')
  const command = (messageWithoutMentions.match(commandRegex) || [])[0]
  const argString = messageWithoutMentions.replace(command, '')
  const args: string[] = argString.match(argsRegex) || []

  if (!command) {
    return ['', ['']]
  }

  return [command.toLowerCase(), args]
}

export default parseMessage
