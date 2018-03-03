const fs = require('fs')
const path = require('path')
const moment = require('moment')
const isOfficer = require('../is-officer')

const deleteEvent = (message, args) => {
  if (!isOfficer(message.member)) {
    return [`You aren't an officer. You are not allowed to delete an event`]
  }

  const [title, ...eventDate] = args
  const date = moment.utc(eventDate.join(' '), 'MM/DD/YYYY hh:mma')
  const existingEventsJSON = fs.readFileSync(
    path.join(__dirname, '../files/events.json')
  )
  const existingEvents = JSON.parse(existingEventsJSON)

  const existingEventIndex = existingEvents.findIndex(event => {
    return event.title === title && event.date === date.toJSON()
  })

  if (existingEventIndex === -1) {
    return [
      `An event with the title ${title} on ${date.format(
        'ddd, MMM Do'
      )} at ${date.format('hh:mma')} doesn't exist.`
    ]
  }

  existingEvents.splice(existingEventIndex, 1)

  fs.writeFileSync(
    path.join(__dirname, '../files/events.json'),
    JSON.stringify(existingEvents)
  )

  return [
    `Deleted event ${title} on ${date.format('ddd, MMM Do')} at ${date.format(
      'hh:mma'
    )}`
  ]
}

module.exports = deleteEvent
