// Types
import { Command } from '../../common/types'

import createCancelCommand from '../../utilities/create-cancel-command'

const description = "I'll cancel WvW for a given date. (Officers Only)"
const shouldDM = false
const fn = createCancelCommand('WvW')

const command: Command = { description, fn, shouldDM }

export default command
