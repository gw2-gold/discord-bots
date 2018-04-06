// Types
import { Command } from '../../common/types'

import createScheduleCommand from '../../utilities/create-schedule-command'

// Tuesday, Wednesday, Thursday
const schedule = [2, 3, 4]
const description =
  "I'll send you general time info about PvP as well as how long it is until the next PvP session"
const shouldDM = false
const fn = createScheduleCommand({
  gameType: 'PvP',
  schedule,
  signupChannelName: 'pvp-signup',
  startHours: 0,
  startMinutes: 0
})

const command: Command = { description, fn, shouldDM }

export default command
