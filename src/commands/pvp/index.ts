// Types
import { Command } from '../../common/types'

import createScheduleCommand from '../../utilities/create-schedule-command'

// Tuesday, Wednesday, Thursday, Friday
const schedule = [2, 3, 4, 5]
const description =
  "I'll send you general time info about PvP as well as how long it is until the next PvP session"
const shouldDM = false
const fn = createScheduleCommand('pvp-signup', 'PvP', 0, 0, schedule, '')

const command: Command = { description, fn, shouldDM }

export default command
