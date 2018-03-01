const moment = require('moment')

const missions = message => {
  const now = moment().utc()
  const sunday = moment()
    .utc()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .day(7)

  return [
    `${
      message.author
    }, Guild Missions are every Saturday Evening [US/Can/Alaska], Sunday Morning [OcX/SEA] at 12:00AM server time.`,
    `The next guild missions are in **${now.to(
      sunday,
      true
    )}**. Hopefully we will see you there :smiley:`
  ]
}

module.exports = missions
