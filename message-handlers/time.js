const moment = require('moment')

const time = message => {
  const m = moment().utc()
  return `${message.author}, the current server time is ${m.format('h:mmA')}`
}

module.exports = time
