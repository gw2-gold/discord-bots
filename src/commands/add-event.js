const fs = require('fs')
const path = require('path')
const moment = require('moment')
const isOfficer = require('../is-officer')

const description = ''
const shouldDM = false
const fn = (message, args) => {
  if (!isOfficer(message.member)) {
    return [`You aren't an officer. You are not allowed to create a new event`]
  }

  const [title, ...eventDate] = args
  const date = moment.utc(eventDate.join(' '), 'MM/DD/YYYY hh:mma')
  const currentDate = moment.utc()

  if (currentDate.isAfter(date)) {
    return [
      `You sent a date that is ${date.from(
        currentDate,
        true
      )} in the past. Did you send the right date?`
    ]
  }

  const existingEventsJSON = fs.readFileSync(
    path.join(__dirname, '../../files/events.json')
  )
  const existingEvents = JSON.parse(existingEventsJSON)

  let eventAlreadyExists = false

  existingEvents.forEach(event => {
    if (
      eventAlreadyExists ||
      (event.title === title &&
        date.diff(moment.utc(event.date), 'seconds') === 0)
    ) {
      eventAlreadyExists = true
    }
  })

  if (eventAlreadyExists) {
    return [
      `The event ${title} on ${date.format('ddd, MMM Do')} at ${date.format(
        'hh:mma'
      )} already exists!`
    ]
  }

  const newEvents = existingEvents.concat([{ title, date }])

  fs.writeFileSync(
    path.join(__dirname, '../../files/events.json'),
    JSON.stringify(
      newEvents.sort((a, b) => {
        const aDate = moment.utc(a.date)
        const bDate = moment.utc(b.date)

        if (aDate.isBefore(bDate)) {
          return -1
        }

        if (aDate.isAfter(bDate)) {
          return 1
        }

        return 0
      })
    )
  )

  return [
    `I have added the event, ${title}. It is set to happen on ${date.format(
      'ddd, MMM Do'
    )} at ${date.format('hh:mma')}, which is **${currentDate.to(date)}**`
  ]
}

module.exports = {
  description,
  fn,
  shouldDM
}
