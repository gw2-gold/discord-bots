// env
import dotenv from 'dotenv'
dotenv.config()

// the discord bot
import bot from './bot'

// event handlers
import onGuildMemberAdd from './on-guild-member-add'
import onMessage from './on-message'
import onReady from './on-ready'

const { TOKEN } = process.env

bot.on('ready', onReady)
bot.on('message', onMessage)
bot.on('guildMemberAdd', onGuildMemberAdd)

bot.login(TOKEN)
