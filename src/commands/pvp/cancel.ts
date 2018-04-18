import createCancelCommand from '../../utilities/create-cancel-command'

const description = "I'll cancel PvP for a given date. (Officers Only)"
const shouldDM = false
const fn = createCancelCommand('PvP')

export default { description, fn, shouldDM }
