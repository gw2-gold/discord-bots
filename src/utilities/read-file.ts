import fs from 'fs'
import path from 'path'

const readFile = (filePath: string): string | undefined => {
  let file

  try {
    file = fs.readFileSync(path.join(__dirname, filePath)).toString()
  } catch (e) {
    throw new Error(e)
  }

  return file
}

export default readFile
