const fs = require('fs').promises
const path = require('path')

async function deleteFile (filePath: string): Promise<void> {
  const filename = filePath.split('/uploads/')[1]

  try {
    await fs.unlink(path.join(__dirname, '..', '..', 'public', 'uploads', filename))
    console.log(`File ${filePath} has been deleted.`)
  } catch (err) {
    console.error(err)
  }
}

export {}
module.exports = deleteFile
