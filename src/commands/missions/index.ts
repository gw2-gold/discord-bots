// Types
import { Command } from '../../common/types'

import createScheduleCommand from '../../utilities/create-schedule-command'

// Sunday and Thursday
const description =
  "I'll send you general time info about Guild Missions as well as how long it is until we next run Guild Missions"
const shouldDM = false
const fn = createScheduleCommand({
  gameType: 'Guild Missions',
  schedulePath: '../../files/mission-schedule.json',
  signupChannelName: 'mission-signup'
})

const command: Command = { description, fn, shouldDM }

export default command
