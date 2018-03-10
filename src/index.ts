// env
import dotenv from 'dotenv'
dotenv.config()

// the discord bot
import bot from './bot'

// utilities
import cleanupEvents from './cleanup-events'
import ensureFilesExist from './ensure-files-exist'

// event handlers
import onGuildMemberAdd from './on-guild-member-add'
import onMessage from './on-message'

const { TOKEN } = process.env

bot.on('ready', () => {
  const commands = Object.keys(require('./commands')).filter(
    command => command !== 'help'
  )
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
      game: { name: `!help | !${commands[index]}` }
    })

    index = index === commands.length - 1 ? 0 : index + 1
  }
})
bot.on('message', onMessage)
bot.on('guildMemberAdd', onGuildMemberAdd)

bot.login(TOKEN)

ensureFilesExist()
cleanup()

// Run cleanup at start and then every 15 minutes
function cleanup() {
  cleanupEvents()

  setTimeout(cleanup, 900000)
}
