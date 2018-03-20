// Types
import { Command, Embed } from '../common/types'

import moment from 'moment'

const description =
  "I'll send you general time info about missions as well as how long it is until we next run guild missions"
const shouldDM = false
const fn = (): Embed => {
  const now = moment().utc()
  const saturday = moment()
    .utc()
    .hours(1)
    .minutes(0)
    .seconds(0)
    .day('Saturday')

  if (now.isAfter(saturday)) {
    if (now.diff(saturday, 'hours') < 2) {
      return {
        title: `Guild missions started **${now.to(saturday)}**`,
        description:
          'Guild Missions are every Friday Evening [US/Can/Alaska], Saturday Morning [OcX/SEA] at 1:00AM server time.\n\n',
        footer: { text: 'You may be able to catch part of it if you hurry!' }
      }
    }

    saturday.day(6)
  }

  return {
    title: `Guild Missions are ${now.to(saturday)}`,
    description:
      'Guild Missions are every Friday Evening [US/Can/Alaska], Saturday Morning [OcX/SEA] at 1:00AM server time.',
    footer: { text: 'Hopefully we will see you there!' }
  }
}

const command: Command = { description, fn, shouldDM }

export default command
