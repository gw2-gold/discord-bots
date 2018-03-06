const { tab } = require('./constants')

const onGuildMemberAdd = member => {
  const isBot = member.user.bot
  const channel = member.guild.channels.find('name', 'general')

  // If we can't find the channel, for some reason,
  // or the message is from a bot, ignore it.
  // We don't want to respond to ourselves or to other bots.
  if (!channel || isBot) return

  // Send a message to everyone in #general to welcome the player
  // and also ask the new person to check their DMs
  channel.send(
    `${member.guild.roles.find('name', '@everyone')} please welcome ${
      member.user
    } to the family! ${
      member.user
    } please check your DMs for a message from me!`
  )

  // Send the new member a DM to welcome them and ask them to
  // change their nickname to include their GW2 account name
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
}

module.exports = onGuildMemberAdd
