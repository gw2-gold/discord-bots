import fs from 'fs'
import path from 'path'

const writeFile = (fileName: string, content: string) => {
  fs.writeFileSync(path.join(__dirname, '../../files', fileName), content)
}

export default writeFile
