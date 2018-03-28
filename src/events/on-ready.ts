import bot from '../utilities/bot'
import getAllCommandPaths from '../utilities/get-all-command-paths'

const onReady = () => {
  const commands = require('../commands').default
  const commandNames = getAllCommandPaths(commands)
    .map(commandName => commandName.replace('.index', '').replace('.', ' '))
    .sort()
    .filter(command => command !== 'help')

  let index = 0
  console.log('Connected')
  console.log(`Logged in as ${bot.user.tag}`)
  bot.user.setPresence({
    game: { name: `!help` }
  })

  setPresence()
  setInterval(setPresence, 15000)

  function setPresence() {
    bot.user.setPresence({
      game: { name: `!help | !${commandNames[index]}` }
    })

    index = index === commandNames.length - 1 ? 0 : index + 1
  }
}

export default onReady
