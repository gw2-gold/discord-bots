// env
require('dotenv').config({ path: '../.env' })

// node builtins
const fs = require('fs')
const path = require('path')

const bot = require('./bot')

// utilities
const cleanupEvents = require('./cleanup-events')
const ensureFilesExist = require('./ensure-files-exist')
const onGuildMemberAdd = require('./on-guild-member-add')
const onMessage = require('./on-message')

const { TOKEN } = process.env

bot.on('ready', () => {
  console.log('Connected')
  console.log(`Logged in as ${bot.user.tag}`)
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
