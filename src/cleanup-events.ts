import fs from 'fs'
import path from 'path'
import moment from 'moment'

const cleanupEvents = () => {
  const currentDate = moment.utc()
  const json = fs
    .readFileSync(path.join(__dirname, '../files/events.json'))
    .toString()
  const existingEvents = JSON.parse(json)
  const futureEvents = existingEvents.filter(
    ({ date: dateJSON }: { date: string }) => {
      const date = moment.utc(dateJSON)
      return currentDate.diff(date, 'hours') < 1
    }
  )

  fs.writeFileSync(
    path.join(__dirname, '../files/events.json'),
    JSON.stringify(futureEvents)
  )
}

export default cleanupEvents
