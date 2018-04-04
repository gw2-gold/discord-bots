// Types
import { Command, Embed } from '../common/types'

import { stripIndent } from 'common-tags'

const description =
  "I'll send you info about how to recruit for [GOLD] and some helpful questions to ask potential goldies"
const shouldDM = false
const fn = (): Embed => {
  return {
    title: 'Recruiting',
    description: stripIndent`
      If you ware planning on recruiting for [GOLD], here is a template message that you can send into chat:
      __If you are NEW or RETURNING, Wealth of Heroes [GOLD] is recruiting.136 Members strong. Taking you into Elona, Maguuma and beyond! Need a guild? Whisper for invite!__
      During the follow up, here are some required/recommended questions:
    `,
    fields: [
      {
        name: 'Required',
        value: stripIndent`
          |  Are you at least 16?
          |  Do you have HoT or PoF? (must have one)
          |  Are you ok repping full-time? (except for WvW, Raids, PvP or Erodome)
        `
      },
      {
        name: 'Recommended',
        value: stripIndent`
          |  How long have you played GW2?
          |  How often do you take breaks from GW2?
          |  Whats the longest break you have taken from GW2?
          |  Do you have any leadership experience in past guilds that may benefit [GOLD]?
          |  Are you an officer or leader of any guild other than a bank guild at this time?
        `
      }
    ]
  }
}

const command: Command = { description, fn, shouldDM }

export default command
