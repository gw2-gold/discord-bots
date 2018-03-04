const addEvent = require('./commands/add-event')
const deleteEvent = require('./commands/delete-event')
const donating = require('./commands/donating')
const events = require('./commands/events')
const missions = require('./commands/missions')
const ranks = require('./commands/ranks')
const recruiting = require('./commands/recruiting')
const rules = require('./commands/rules')
const sites = require('./commands/sites')
const time = require('./commands/time')

const getCommands = (includeHelp = true) => {
  let help

  if (includeHelp) {
    help = require('./commands/help')
  }

  return {
    '!addevent': addEvent,
    '!deleteevent': deleteEvent,
    '!donating': donating,
    '!events': events,
    '!help': help,
    '!missions': missions,
    '!ranks': ranks,
    '!recruiting': recruiting,
    '!rules': rules,
    '!sites': sites,
    '!time': time
  }
}

module.exports = getCommands
