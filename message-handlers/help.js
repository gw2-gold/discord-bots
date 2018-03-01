const { tab } = require('../constants')

const help = message => {
  return [
    `hey **${message.author.username}**,`,
    ,
    "here's a list of all the questions you can ask me here or while in the **[GOLD]** server:",
    `${tab}**!donating**: I'll tell you how to donate items toward guild hall improvements! Thanks! :smiley:`,
    `${tab}**!help**: I'll come to your aid and send you this message again, with any added/updated commands!`,
    `${tab}**!missions**: I'll send you general time info about missions as well as how long it is until we next run guild missions`,
    `${tab}**!ranks**: I'll send you info about the guild ranks and a link for more details`,
    `${tab}**!recruiting**: I'll send you info about how to recruit for [GOLD] and some helpful questions to ask potential goldies`,
    `${tab}**!rules**: I'll send you the link to the guild rules`,
    `${tab}**!time**: I'll send you the current server time`
  ]
}

module.exports = help
