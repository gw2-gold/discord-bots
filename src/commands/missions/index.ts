// Types
import { Command } from '../../common/types'

import createScheduleCommand from '../../utilities/create-schedule-command'
import getOrganizersByType from '../../utilities/get-organizers-by-type'

// Sunday and Thursday
const schedule = [6]
const description =
  "I'll send you general time info about Guild Missions as well as how long it is until we next run Guild Missions"
const shouldDM = false
const fn = createScheduleCommand(
  'mission-signup',
  'Guild Missions',
  1,
  0,
  schedule,
  '',
  getOrganizersByType('Guild Mission')
)

const command: Command = { description, fn, shouldDM }

export default command
