// Types
import { Command } from '../../common/types'

import createScheduleCommand from '../../utilities/create-schedule-command'

// Tuesday, Wednesday, Thursday
const description =
  "I'll send you general time info about WvW as well as how long it is until the next WvW session"
const shouldDM = false
const fn = createScheduleCommand({
  gameType: 'WvW',
  signupChannelName: 'wvw-signup'
})

const command: Command = { description, fn, shouldDM }

export default command
