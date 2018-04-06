import bot from '../utilities/bot'
const { GUILD_NAME } = process.env

const getGuild = () => bot.guilds.find('name', GUILD_NAME)

export default getGuild
