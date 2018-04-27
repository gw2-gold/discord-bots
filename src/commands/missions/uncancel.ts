// Types
import { Command } from '../../common/types'

import createUncancelCommand from '../../utilities/create-uncancel-command'

const description =
  "I'll cancel Guild Missions for a given date. (Officers Only)"
const shouldDM = false
const fn = createUncancelCommand('Mission', 'Guild Missions')

const command: Command = { description, fn, shouldDM }

export default command
