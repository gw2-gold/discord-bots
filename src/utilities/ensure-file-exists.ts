import fs from 'fs'
import path from 'path'

const ensureFileExists = (filePath: string, content: string) => {
  if (!fs.existsSync(path.join(__dirname, '../../files'))) {
    fs.mkdirSync(path.join(__dirname, '../../files'))
  }

  if (fs.existsSync(path.join(__dirname, filePath))) {
    return
  } else {
    fs.writeFileSync(path.join(__dirname, filePath), content)
  }
}

export default ensureFileExists
