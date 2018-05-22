import fs from 'fs'
import path from 'path'

const readFile = (fileName: string): string | undefined => {
  let file

  try {
    file = fs
      .readFileSync(path.join(__dirname, '../../files', fileName))
      .toString()
  } catch (e) {
    throw new Error(e)
  }

  return file
}

export default readFile
