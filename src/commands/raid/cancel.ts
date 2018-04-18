import createCancelCommand from '../../utilities/create-cancel-command'

const description = "I'll cancel Raids for a given date. (Officers Only)"
const shouldDM = false
const fn = createCancelCommand('Raid', 'Raids')

export default { description, fn, shouldDM }
