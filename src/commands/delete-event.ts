// Types
import { Command, Event, Response } from '../common/types'
import { Message } from 'discord.js'

import fs from 'fs'
import path from 'path'
import moment from 'moment'
import isOfficer from '../is-officer'

const description = ''
const shouldDM = false
const fn = (message: Message, args: string[]): Response => {
  if (!isOfficer(message.member)) {
    return [`You aren't an officer. You are not allowed to delete an event`]
  }

  const [title, ...eventDate] = args
  const date = moment.utc(eventDate.join(' '), 'MM/DD/YYYY hh:mma')
  const existingEventsJSON = fs
    .readFileSync(path.join(__dirname, '../../files/events.json'))
    .toString()
  const existingEvents: Event[] = JSON.parse(existingEventsJSON)

  const existingEventIndex: number = existingEvents.findIndex(
    (event: Event) => {
      return event.title === title && event.date === date.toJSON()
    }
  )

  if (existingEventIndex === -1) {
    return [
      `An event with the title ${title} on ${date.format(
        'ddd, MMM Do'
      )} at ${date.format('hh:mma')} doesn't exist.`
    ]
  }

  existingEvents.splice(existingEventIndex, 1)

  fs.writeFileSync(
    path.join(__dirname, '../../files/events.json'),
    JSON.stringify(existingEvents)
  )

  return [
    `Deleted event ${title} on ${date.format('ddd, MMM Do')} at ${date.format(
      'hh:mma'
    )}`
  ]
}

const command: Command = { description, fn, shouldDM }

export default command
