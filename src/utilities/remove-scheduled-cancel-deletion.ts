import scheduler from 'node-schedule'

const removeScheduledCancelDeletion = (type: string, cancelledDate: string) => {
  scheduler.cancelJob(`${type}${cancelledDate}`)
}

export default removeScheduledCancelDeletion
