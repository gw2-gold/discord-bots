// Types
import { Command } from '../../common/types'

import createUncancelCommand from '../../utilities/create-uncancel-command'

const description = "I'll uncancel Fractals for a given date. (Officers Only)"
const shouldDM = false
const fn = createUncancelCommand('Fractal')

const command: Command = { description, fn, shouldDM }

export default command
