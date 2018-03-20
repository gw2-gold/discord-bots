import bot from './bot'

const onReady = () => {
  const { commands, commandsWithSubCommands } = require('./commands')

  const commandNames = Object.keys(commands)
    .concat(Object.keys(commandsWithSubCommands))
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

    index = index === commands.length - 1 ? 0 : index + 1
  }
}

export default onReady
