const moment = require('moment')

const description = "I'll send you the current server time"
const shouldDM = false
const fn = message => {
  const m = moment().utc()
  return `${message.author}, the current server time is ${m.format('h:mmA')}`
}

module.exports = { description, fn, shouldDM }
