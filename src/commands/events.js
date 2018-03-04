const fs = require('fs')
const path = require('path')
const moment = require('moment')
const getGuild = require('../get-guild')

const description = ''
const shouldDM = false
const fn = message => {
  let json
  try {
    json = fs.readFileSync(path.join(__dirname, '../../files/events.json'))
  } catch (e) {
    const guild = getGuild()
    const admin = guild.members.find('nickname', 'jeff/deth')

    return [
      `Sorry! Something went wrong. Please contact ${admin} so he can fix me!`
    ]
  }
  const events = JSON.parse(json || '[]')

  if (events.length === 0) {
    return ['No events scheduled']
  }

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

module.exports = { description, fn, shouldDM }
