import readFile from './read-file'
import writeFile from './write-file'

const removeCancelledDate = (type: string, cancelledDate: string) => {
  const filePath = `../../files/${type}-schedule.json`
  const file = JSON.parse(readFile(filePath) || '{}')
  const index = file.cancelledDates.findIndex(
    (date: string) => date === cancelledDate
  )

  file.cancelledDates.splice(index, 1)

  writeFile(filePath, JSON.stringify(file))
}

export default removeCancelledDate
