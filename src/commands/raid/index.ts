// Types
import { Command } from '../../common/types'

import createScheduleCommand from '../../utilities/create-schedule-command'

// Sunday and Thursday
const description =
  "I'll send you general time info about Raids as well as how long it is until the next Raid"
const shouldDM = false
const fn = createScheduleCommand({
  gameType: 'Raids',
  schedulePath: '../../files/raid-schedule.json',
  signupChannelName: 'raid-signup'
})

const command: Command = { description, fn, shouldDM }

export default command
