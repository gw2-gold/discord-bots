// Types
import { Command } from '../../common/types'

import createCancelCommand from '../../utilities/create-cancel-command'

const description =
  "I'll cancel Guild Missions for a given date. (Officers Only)"
const shouldDM = false
const fn = createCancelCommand('Mission')

const command: Command = { description, fn, shouldDM }

export default command
