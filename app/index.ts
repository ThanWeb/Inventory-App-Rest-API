const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const router = require('./routes')
const bodyParser = require('body-parser')

dotenv.config()

const app = express()
const port = process.env.PORT ?? 8000

app.use(express.json())

const corsOptions = {
  origin: process.env.CLIENT_URL ?? '',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.set('trust proxy', true)
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`\nApp Running on http://localhost:${port}`)
  console.log('Press Ctrl-C to terminate\n')
})

app.use('/', router)
