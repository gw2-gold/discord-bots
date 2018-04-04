// Types
import { Command } from '../../common/types'

import createScheduleCommand from '../../utilities/create-schedule-command'
import getOrganizersByGameType from '../../utilities/get-organizers-by-game-type'

// Sunday and Thursday
const schedule = [0]
const description =
  "I'll send you general time info about Raids as well as how long it is until the next Raid"
const shouldDM = false
const fn = createScheduleCommand(
  'raid-signup',
  'Raids',
  1,
  0,
  schedule,
  '',
  getOrganizersByGameType('Raid')
)

const command: Command = { description, fn, shouldDM }

export default command
