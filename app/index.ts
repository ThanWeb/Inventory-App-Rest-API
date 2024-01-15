const express = require('express')
const router = require('../config/routes')

const app = express()
const port = process.env.PORT ?? 8000

app.use(express.json())
app.listen(port, () => {
  console.log(`\nApp Running on http://localhost:${port}`)
  console.log('Press Ctrl-C to terminate\n')
})

app.use('/', router)
