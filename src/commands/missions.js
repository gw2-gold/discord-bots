const moment = require('moment')

const description =
  "I'll send you general time info about missions as well as how long it is until we next run guild missions"
const shouldDM = false
const fn = message => {
  const now = moment().utc()
  const sunday = moment()
    .utc()
    .hours(1)
    .minutes(0)
    .seconds(0)
    .day('Sunday')

  if (now.isAfter(sunday)) {
    if (now.diff(sunday, 'hours') < 2) {
      return [
        `${
          message.author
        }, Guild Missions are every Saturday Evening [US/Can/Alaska], Sunday Morning [OcX/SEA] at 1:00AM server time.`,
        `Guild missions started **${now.to(
          sunday
        )}**. You may be able to catch part of it if you hurry!`
      ]
    }

    sunday.day(7)
  }

  return [
    `${
      message.author
    }, Guild Missions are every Saturday Evening [US/Can/Alaska], Sunday Morning [OcX/SEA] at 1:00AM server time.`,
    `The next guild missions are in **${now.to(
      sunday,
      true
    )}**. Hopefully we will see you there :smiley:`
  ]
}

module.exports = { description, fn, shouldDM }
