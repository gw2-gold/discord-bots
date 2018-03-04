const { tab } = require('../constants')

const description =
  "I'll send you info about how to recruit for [GOLD] and some helpful questions to ask potential goldies"
const shouldDM = false
const fn = message => {
  return [
    'If you ware planning on recruiting for [GOLD], here is a template message that you can send into chat:',
    `${tab}__If you are NEW or RETURNING, Wealth of Heroes [GOLD] is recruiting.136 Members strong. Taking you into Elona, Maguuma and beyond! Need a guild? Whisper for invite!__`,
    'During the follow up, here are some required/recommended questions:',
    ,
    '**Required:**',
    `${tab}**1)** Are you at least 16?`,
    `${tab}**2)** Do you have HoT or PoF? (must have one)`,
    `${tab}**3)** We would like you to represent us full time during PvE. (Repping not required for WvW, Raids, PvP or in the Aerodome`,
    '**Recommended:**',
    `${tab}**1)** How long have you played GW2? [This is very useful in deciding what other questions to ask]`,
    `${tab}**2)** How often do you take breaks from GW2?`,
    `${tab}**3)** Whats the longest break you have taken from GW2?`,
    `${tab.repeat(
      2
    )}- If you see a pattern of being gone from the game, you may not want to recruit this person. Use your judgement.`,
    `${tab}**4)** Do you have any leadership experience in past guilds that may benefit [GOLD]`,
    `${tab}**5)** Are you an officer or leader of any guild other than a bank guild at this time`
  ]
}

module.exports = { description, fn, shouldDM }
