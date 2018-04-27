// env
import dotenv from 'dotenv'
dotenv.config()

import moment from 'moment'

// the discord bot
import bot from './utilities/bot'

// utilities
import ensureFileExists from './utilities/ensure-file-exists'
import readFile from './utilities/read-file'
import removeCancelledDate from './utilities/remove-cancelled-date'
import scheduleCancelDeletion from './utilities/schedule-cancel-deletion'

// ensure required files exist
;['fractal', 'mission', 'pvp', 'raid', 'wvw'].forEach(type => {
  ensureFileExists(
    `../../files/${type}-schedule.json`,
    JSON.stringify({
      schedule: (process.env[`DEFAULT_${type.toUpperCase()}_SCHEDULE`] || '')
        .split(', ')
        .map(dayTime => {
          const [day, hour, minute] = dayTime
            .split(/\s|:/)
            .map(str => Number(str))

          return {
            day,
            hour,
            minute
          }
        }),
      cancelledDates: []
    })
  )

  const { cancelledDates }: { cancelledDates: string[] } = JSON.parse(
    readFile(`../../files/${type}-schedule.json`) || '{}'
  )

  cancelledDates.forEach(cancelledDate => {
    const now = moment.utc()
    const date = moment.utc(cancelledDate)

    if (now.isAfter(date)) {
      removeCancelledDate(type, cancelledDate)

      return
    }

    scheduleCancelDeletion(type, cancelledDate)
  })
})

// event handlers
import onGuildMemberAdd from './events/on-guild-member-add'
import onMessage from './events/on-message'
import onReady from './events/on-ready'

const { TOKEN } = process.env

bot.on('ready', onReady)
bot.on('message', onMessage)
bot.on('guildMemberAdd', onGuildMemberAdd)

bot.login(TOKEN)
