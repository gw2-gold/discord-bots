import createUncancelCommand from '../../utilities/create-uncancel-command'

const description = "I'll uncancel Fractals for a given date. (Officers Only)"
const shouldDM = false
const fn = createUncancelCommand('Fractal', 'Fractals')

export default { description, fn, shouldDM }
