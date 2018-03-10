// Types
import { Command, Embed } from '../common/types'

import moment from 'moment'

const description = "I'll send you the current server time"
const shouldDM = false
const fn = (): Embed => {
  const m = moment().utc()

  return {
    title: `Current server time is ${m.format('h:mmA')}`
  }
}

const command: Command = { description, fn, shouldDM }

export default command
