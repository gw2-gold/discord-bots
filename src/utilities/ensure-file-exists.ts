import fs from 'fs'
import path from 'path'

const ensureFileExists = (fileName: string, content: string) => {
  if (!fs.existsSync(path.join(__dirname, '../../files'))) {
    fs.mkdirSync(path.join(__dirname, '../../files'))
  }

  if (fs.existsSync(path.join(__dirname, '../../files', fileName))) {
    return
  } else {
    fs.writeFileSync(path.join(__dirname, '../../files', fileName), content)
  }
}

export default ensureFileExists
