const fs = require('fs')
const path = require('path')

const ensureFilesExist = () => {
  try {
    fs.mkdirSync(path.join(__dirname, '../files'))
  } catch (e) {
    if (e.code !== 'EEXIST') {
      console.log('something actually went wrong :(')
    }
  }

  if (!fs.existsSync(path.join(__dirname, '../files/events.json'))) {
    fs.writeFileSync(path.join(__dirname, '../files/events.json'), '[]')
  }
}

module.exports = ensureFilesExist
