import createUncancelCommand from '../../utilities/create-uncancel-command'

const description =
  "I'll cancel Guild Missions for a given date. (Officers Only)"
const shouldDM = false
const fn = createUncancelCommand('Mission', 'Guild Missions')

export default { description, fn, shouldDM }
