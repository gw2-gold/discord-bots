import moment from 'moment'
import scheduler from 'node-schedule'

import removeCancelledDate from './remove-cancelled-date'

const scheduleCancelDeletion = (type: string, cancelledDate: string) => {
  const date = moment.utc(cancelledDate)

  scheduler.scheduleJob(`${type}${cancelledDate}`, date.toDate(), () => {
    removeCancelledDate(type, cancelledDate)
  })
}

export default scheduleCancelDeletion
