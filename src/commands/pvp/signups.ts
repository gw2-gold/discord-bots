// Types
import { Command } from '../../common/types'

import createSignupCommand from '../../create-signup-command'

const description =
  "I'll send you the members that are currently signed up for the next pvp session, along with the classes/elite specs they are willing to play"
const shouldDM = false

const channel = 'pvp-signup'
const noSignupsTitle = 'No on has signed up for the next PvP session yet!'
const title = 'Here are the current signups for the next PvP session'

const fn = createSignupCommand(channel, noSignupsTitle, title)

const command: Command = { description, fn, shouldDM }

export default command