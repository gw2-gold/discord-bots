// Types
import { Command } from '../../common/types'

import createPermaCancelCommand from '../../utilities/create-perma-cancel-command'

const description = "I'll permanently cancel Guild Missions. (Leaders Only)"
const shouldDM = false
const fn = createPermaCancelCommand('Mission')

const command: Command = { description, fn, shouldDM }

export default command
