import createUncancelCommand from '../../utilities/create-uncancel-command'

const description = "I'll cancel Raids for a given date. (Officers Only)"
const shouldDM = false
const fn = createUncancelCommand('Raid', 'Raids')

export default { description, fn, shouldDM }
