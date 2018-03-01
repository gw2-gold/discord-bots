// env
require('dotenv').config()

// discord
const discord = require('discord.js')

// message handlers
const donating = require('./message-handlers/donating')
const help = require('./message-handlers/help')
const missions = require('./message-handlers/missions')
const ranks = require('./message-handlers/ranks')
const recruiting = require('./message-handlers/recruiting')
const rules = require('./message-handlers/rules')
const sites = require('./message-handlers/sites')
const time = require('./message-handlers/time')

const { TOKEN } = process.env
const bot = new discord.Client()

bot.on('ready', () => {
  console.log('Connected')
  console.log(`Logged in as ${bot.user.tag}`)
})

bot.on('message', message => {
  let response
  let shouldPM = false

  switch (message.content) {
    case '!donating':
      response = donating(message)
      break
    case '!help':
      response = help(message)
      shouldPM = true
      break
    case '!missions':
      response = missions(message)
      break
    case '!ranks':
      response = ranks(message)
      break
    case '!recruiting':
      response = recruiting(message)
      break
    case '!rules':
      response = rules(message)
      break
    case '!sites':
      response = sites(message)
      break
    case '!time':
      response = time(message)
      break
    default:
      return
  }

  if (response) {
    const channel = shouldPM ? message.author : message.channel
    if (shouldPM) {
      message.channel.send(
        `${message.author}, I just slid into your DMs! :smiley:`
      )
    }
    channel.send(response)
  }
})

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'general')

  if (!channel) return

  channel.send(
    `${member.guild.roles.find('name', '@everyone')} please welcome **${
      member.user
    }** to the family!`
  )
})

bot.login(TOKEN)
