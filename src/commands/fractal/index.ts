// Types
import { Command } from '../../common/types'

import createScheduleCommand from '../../utilities/create-schedule-command'

// Monday and Friday
const extraMessage = '__For now, all scheduled days are for training__'
const description =
  "I'll send you general time info about Fractals as well as how long it is until the next Fractal run"
const shouldDM = false
const fn = createScheduleCommand({
  extraMessage,
  gameType: 'Fractals',
  signupChannelName: 'fractal-signup',
  schedulePath: '../../files/fractal-schedule.json'
})

const command: Command = { description, fn, shouldDM }

export default command
