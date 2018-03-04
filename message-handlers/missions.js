const moment = require('moment')

const missions = message => {
  const now = moment().utc()
  const sunday = moment()
    .utc()
    .hours(1)
    .minutes(0)
    .seconds(0)
    .day('Sunday')

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

module.exports = missions
