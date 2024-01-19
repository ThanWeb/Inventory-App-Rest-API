const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const router = require('./routes')

dotenv.config()

const app = express()
const port = process.env.PORT ?? 8000

app.use(express.json())
app.use(cors())
app.use('/', router)
app.use(cookieParser())

app.listen(port, () => {
  console.log(`\nApp Running on http://localhost:${port}`)
  console.log('Press Ctrl-C to terminate\n')
})
