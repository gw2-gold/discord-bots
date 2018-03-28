// Types
import { Command } from '../../common/types'

import createScheduleCommand from '../../utilities/create-schedule-command'

// Monday and Friday
const schedule = [1, 5]
const extraMessage = '__For now, all scheduled days are for training__'
const description =
  "I'll send you general time info about Fractals as well as how long it is until the next Fractal run"
const shouldDM = false
const fn = createScheduleCommand(
  'fractal-signup',
  'Fractals',
  1,
  0,
  schedule,
  extraMessage
)

const command: Command = { description, fn, shouldDM }

export default command
