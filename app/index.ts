const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const router = require('./routes')

dotenv.config()

const app = express()
const port = process.env.PORT ?? 8000

const corsOptions = {
  origin: [process.env.CLIENT_URL ?? ''],
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/', router)
app.use(cookieParser())

app.listen(port, () => {
  console.log(`\nApp Running on http://localhost:${port}`)
  console.log('Press Ctrl-C to terminate\n')
})
