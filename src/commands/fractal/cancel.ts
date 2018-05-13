// Types
import { Command } from '../../common/types'

import createCancelCommand from '../../utilities/create-cancel-command'

const description = "I'll cancel Fractals for a given date. (Officers Only)"
const shouldDM = false
const fn = createCancelCommand('Fractal')

const command: Command = { description, fn, shouldDM }

export default command
