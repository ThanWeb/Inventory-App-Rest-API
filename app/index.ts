const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const router = require('./routes')
const bodyParser = require('body-parser')
const multer = require('multer')

const verifyToken = require('./middlewares/verifyToken')
const { uploadSingleImageProduct } = require('./controllers/productController')

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
app.use(express.static(path.resolve(__dirname, '../public')))

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, './public/uploads')
  },
  filename: (req: any, file: any, cb: any) => {
    cb(
      null,
      path.parse(file.originalname).name +
        '-' +
          Date.now() +
          path.extname(file.originalname)
    )
  }
})

const upload = multer({ storage })

app.listen(port, () => {
  console.log(`\nApp Running on http://localhost:${port}`)
  console.log('Press Ctrl-C to terminate\n')
})

app.use('/', router)
app.post('/product/image', verifyToken, upload.single('image'), uploadSingleImageProduct)
