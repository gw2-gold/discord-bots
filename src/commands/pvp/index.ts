// Types
import { Command } from '../../common/types'

import createScheduleCommand from '../../utilities/create-schedule-command'

// Tuesday, Wednesday, Thursday
const description =
  "I'll send you general time info about PvP as well as how long it is until the next PvP session"
const shouldDM = false
const fn = createScheduleCommand({
  gameType: 'PvP',
  signupChannelName: 'pvp-signup'
})

const command: Command = { description, fn, shouldDM }

export default command
