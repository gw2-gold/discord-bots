import bot from '../utilities/bot'
import checkIfSquiresRequirePromotion from '../utilities/check-if-squires-require-promotion'
import getAllCommandPaths from '../utilities/get-all-command-paths'
import scheduler from 'node-schedule'

const onReady = async () => {
  const commands = require('../commands').default
  const commandNames = getAllCommandPaths(commands)
    .map(commandName => commandName.replace('.index', '').replace('.', ' '))
    .sort()
    .filter(command => command !== 'help')

  let index = 0
  console.log('Connected')
  console.log(`Logged in as ${bot.user.tag}`)

  setPresence()
  setInterval(setPresence, 15000)

  await checkIfSquiresRequirePromotion()

  // Check for squires requiring promotion every day at 8am
  scheduler.scheduleJob('promotionCheck', '0 8 * * *', () => {
    checkIfSquiresRequirePromotion()
  })

  function setPresence() {
    bot.user.setPresence({
      game: { name: `!help | !${commandNames[index]}` }
    })

    index = index === commandNames.length - 1 ? 0 : index + 1
  }
}

export default onReady
