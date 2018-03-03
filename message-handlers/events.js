const fs = require('fs')
const path = require('path')
const moment = require('moment')

const events = message => {
  let json
  try {
    json = fs.readFileSync(path.join(__dirname, '../files/events.json'))
  } catch (e) {
    return ['No events scheduled']
  }
  const events = JSON.parse(json || '[]')
  const currentDate = moment.utc()
  const response = ['Here is a list of upcoming events:', ,]

  events.forEach(({ date: dateJSON, title }) => {
    const date = moment.utc(dateJSON)

    if (currentDate.isAfter(date)) {
      if (currentDate.diff(date, 'hours') < 1) {
        response.push(
          `**${title}** started **${date.from(
            currentDate
          )}**. You may catch part of it if you hurry!`
        )

        return
      }

      return
    }

    if (date.diff(currentDate, 'days') < 1) {
      response.push(
        `**${title}** starts ${currentDate.to(date)}, at ${date.format(
          'hh:mma'
        )}`
      )

      return
    }

    response.push(
      `**${title}** is ${currentDate.to(date)}, on ${date.format(
        'ddd, MMM Do'
      )} at ${date.format('hh:mma')}`
    )
  })

  return response
}

module.exports = events
