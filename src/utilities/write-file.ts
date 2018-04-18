import fs from 'fs'
import path from 'path'

const writeFile = (filePath: string, content: string) => {
  fs.writeFileSync(path.join(__dirname, filePath), content)
}

export default writeFile
