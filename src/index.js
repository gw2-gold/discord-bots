// env
require('dotenv').config({ path: '../.env' })

// node builtins
const fs = require('fs')
const path = require('path')

// the discord bot
const bot = require('./bot')

// utilities
const cleanupEvents = require('./cleanup-events')
const ensureFilesExist = require('./ensure-files-exist')

// event handlers
const onGuildMemberAdd = require('./on-guild-member-add')
const onMessage = require('./on-message')

const { TOKEN } = process.env

bot.on('ready', () => {
  const commands = Object.keys(require('./commands'))
  let index = 0
  console.log('Connected')
  console.log(`Logged in as ${bot.user.tag}`)
  bot.user.setPresence({
    game: { name: `!help` }
  })

  setInterval(() => {
    bot.user.setPresence({
      game: { name: `!help | !${commands[index]}` }
    })

    index = index === commands.length - 1 ? 0 : index + 1
  }, 15000)
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
