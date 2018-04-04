import bot from '../utilities/bot'
const { GUILD_NAME } = process.env

/**
 * Get the guild that the bot is associated with
 * @return {Guild}
 */
const getGuild = () => bot.guilds.find('name', GUILD_NAME)

export default getGuild
