// Types
import { Command } from '../../common/types'

import createMessage from '../../utilities/create-message'
import createScheduleCommand from '../../utilities/create-schedule-command'

// Monday and Friday
const schedule = [1, 5]
const message = createMessage('fractal-signup', 'Fractals', 1, 0, '', schedule)
const description =
  "I'll send you general time info about Fractals as well as how long it is until the next Fractal run"
const shouldDM = false
const fn = createScheduleCommand(1, 0, schedule, message)

const command: Command = { description, fn, shouldDM }

export default command
