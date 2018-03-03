const fs = require('fs')
const path = require('path')
const moment = require('moment')

const cleanupEvents = () => {
  const currentDate = moment.utc()
  const json = fs.readFileSync(path.join(__dirname, '/files/events.json'))
  const existingEvents = JSON.parse(json)
  const futureEvents = existingEvents.filter(({ date: dateJSON }) => {
    const date = moment.utc(dateJSON)
    return currentDate.diff(date, 'hours') < 1
  })

  fs.writeFileSync(
    path.join(__dirname, '/files/events.json'),
    JSON.stringify(futureEvents)
  )
}

module.exports = cleanupEvents
