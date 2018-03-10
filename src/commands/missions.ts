// Types
import { Command, Embed } from '../common/types'

import moment from 'moment'

const description =
  "I'll send you general time info about missions as well as how long it is until we next run guild missions"
const shouldDM = false
const fn = (): Embed => {
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
        title: `Guild missions started **${now.to(sunday)}**`,
        description:
          'Guild Missions are every Saturday Evening [US/Can/Alaska], Sunday Morning [OcX/SEA] at 1:00AM server time.\n\n',
        footer: { text: 'You may be able to catch part of it if you hurry!' }
      }
    }

    sunday.day(7)
  }

  return {
    title: `Guild Missions are ${now.to(sunday)}`,
    description:
      'Guild Missions are every Saturday Evening [US/Can/Alaska], Sunday Morning [OcX/SEA] at 1:00AM server time.',
    footer: { text: 'Hopefully we will see you there!' }
  }
}

const command: Command = { description, fn, shouldDM }

export default command
