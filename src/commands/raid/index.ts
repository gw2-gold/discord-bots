// Types
import { Command, Embed } from '../../common/types'

import moment from 'moment'
import getGuild from '../../get-guild'

const description =
  "I'll send you general time info about our raids as well as how long it is until our next raid"
const shouldDM = false

const fn = (): Embed => {
  const guild = getGuild()
  const raidSignupChannel = guild.channels.find('name', 'raid-signup')
  const description = [
    'Raids are every Saturday Evening [US/Can/Alaska], Sunday Morning [OcX/SEA] at 1:00AM server time.',
    `To signup for Raids, go to ${raidSignupChannel}`
  ].join('\n\n')
  const now = moment().utc()
  const sunday = moment()
    .utc()
    .hours(1)
    .minutes(0)
    .seconds(0)
    .day('Sunday')

  if (now.isAfter(sunday)) {
    if (now.diff(sunday, 'hours') < 2) {
      return {
        title: `The Raid session started **${now.to(sunday)}**`,
        description,
        footer: { text: 'You may be able to catch part of it if you hurry!' }
      }
    }

    sunday.day(7)
  }

  return {
    title: `The next Raid session is ${now.to(sunday)}`,
    description,
    footer: {
      text: 'Hopefully we will see you there!'
    }
  }
}

const command: Command = { description, fn, shouldDM }

export default command
