// Types
import { Command } from '../../common/types'

import createMessage from '../../utilities/create-message'
import createScheduleCommand from '../../utilities/create-schedule-command'

// Tuesday, Wednesday, Thursday, Friday
const schedule = [2, 3, 4, 5]
const message = createMessage('pvp-signup', 'PvP', 0, 0, '', schedule)
const description =
  "I'll send you general time info about PvP as well as how long it is until the next PvP session"
const shouldDM = false
const fn = createScheduleCommand(0, 0, schedule, message)

const command: Command = { description, fn, shouldDM }

export default command
