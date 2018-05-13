// Types
import { Command } from '../../common/types'

import createPermaCancelCommand from '../../utilities/create-perma-cancel-command'

const description = "I'll permanently cancel WvW. (Leaders Only)"
const shouldDM = false
const fn = createPermaCancelCommand('WvW')

const command: Command = { description, fn, shouldDM }

export default command
