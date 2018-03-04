const bot = require('./bot')
const { GUILD_NAME } = process.env

const getGuild = () => bot.guilds.find('name', GUILD_NAME)

module.exports = getGuild
