// Types
import { Command } from '../../common/types'

import createPermaCancelCommand from '../../utilities/create-perma-cancel-command'

const description = "I'll permanently cancel Raids. (Leaders Only)"
const shouldDM = false
const fn = createPermaCancelCommand('Raid')

const command: Command = { description, fn, shouldDM }

export default command
