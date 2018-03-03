// env
require('dotenv').config()

const fs = require('fs')
const path = require('path')

// discord
const discord = require('discord.js')

// utilities
const cleanupEvents = require('./cleanup-events')
const { tab } = require('./constants')
const parseMessage = require('./parse-message')

// message handlers
const addEvent = require('./message-handlers/add-event')
const deleteEvent = require('./message-handlers/delete-event')
const donating = require('./message-handlers/donating')
const events = require('./message-handlers/events')
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
  if (!message.content || message.content === '') {
    return
  }

  const [command, args] = parseMessage(message.content)
  let response
  let shouldPM = false

  switch (command) {
    case '!addevent':
      response = addEvent(message, args)
      break
    case '!deleteevent':
      response = deleteEvent(message, args)
      break
    case '!donating':
      response = donating(message)
      break
    case '!events':
      response = events(message)
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
  const isBot = member.user.bot
  const channel = member.guild.channels.find('name', 'general')

  if (!channel || isBot) return

  channel.send(
    `${member.guild.roles.find('name', '@everyone')} please welcome ${
      member.user
    } to the family! ${
      member.user
    } please check your DMs for a message from me!`
  )

  member.send([
    `Hey **${
      member.user.username
    }**! We are really excited to have you in the [GOLD] family.`,
    `In order to make it easier for everyone to get to know you, can you please follow the steps below to change your 'nickname' on the [GOLD] server:`,
    `${tab}1) Click on the [GOLD] server from your list of severs on the left side of discord`,
    `${tab}2) Click on the down arrow, next to where it says "Wealth of Heroes [GOLD] above the channels list`,
    `${tab}3) Click "Change Nickname"`,
    `${tab}You can change this to anything you want, as long as it includes your in-game account name.`,
    `${tab}For instance, if your account name is **Leo.1234**, you could choose something like:`,
    `${tab}${tab}- Leo.1234`,
    `${tab}${tab}- Leo`,
    `${tab}${tab}- A Name you Choose/Leo`,
    `${tab}${tab}- A Name you Choose (Leo)`
  ])
})

bot.login(TOKEN)

ensureFilesExist()
cleanup()

// Run cleanup at start and then every 15 minutes
function cleanup() {
  cleanupEvents()

  setTimeout(cleanup, 900000)
}

function ensureFilesExist() {
  try {
    fs.mkdirSync(path.join(__dirname, '/files'))
  } catch (e) {
    if (e.code !== 'EEXIST') {
      console.log('something actually went wrong :(')
    }
  }

  if (!fs.existsSync(path.join(__dirname, '/files/events.json'))) {
    fs.writeFileSync(path.join(__dirname, '/files/events.json'), '[]')
  }
}
