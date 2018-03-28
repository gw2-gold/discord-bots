// env
import dotenv from 'dotenv'
dotenv.config()

// the discord bot
import bot from './utilities/bot'

// event handlers
import onGuildMemberAdd from './events/on-guild-member-add'
import onMessage from './events/on-message'
import onReady from './events/on-ready'

const { TOKEN } = process.env

bot.on('ready', onReady)
bot.on('message', onMessage)
bot.on('guildMemberAdd', onGuildMemberAdd)

bot.login(TOKEN)
