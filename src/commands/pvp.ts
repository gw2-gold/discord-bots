// Types
import { Command, Embed } from '../common/types'
import { Moment } from 'moment'

import moment from 'moment'

// Tuesday, Wednesday, Thursday, Friday
const schedule = [2, 3, 4, 5]
const message = (now: Moment, next: Moment) => {
  return {
    title: `The next PvP session starts ${now.to(next)}`,
    description:
      'PvP sessions are at 12:00am Server Time and are about an hour and a half long.',
    fields: [
      {
        name: '[US/Can/Alaska]',
        value: 'Monday - Thursday Night'
      },
      {
        name: '[OcX/SEA]',
        value: 'Tuesday - Friday Morning'
      }
    ],
    footer: {
      text:
        'Want to PvP outside of these times? Just ask in discord #general or in-game Guild chat'
    }
  }
}

const description =
  "I'll send you general time info about PvP as well as how long it is until the next PvP session"
const shouldDM = false
const fn = (): Embed => {
  const now = moment.utc()
  const day = now.day()
  let nextPvP = now
    .clone()
    .hours(0)
    .minutes(0)
    .seconds(0)

  // If the next day is has a PvP session
  if (schedule.includes(day + 1)) {
    nextPvP = nextPvP.day(day + 1)

    return message(now, nextPvP)
  }

  // If it isn't one of the above,
  // the next PvP session is next Tuesday
  nextPvP = nextPvP.day(9)

  return message(now, nextPvP)
}

const command: Command = { description, fn, shouldDM }

export default command
