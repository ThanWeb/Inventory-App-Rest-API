const express = require('express')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const { Request, Response, NextFunction } = require('express')

const {
  registerAdmin,
  loginAdmin,
  logout,
  verifyAccessToken
} = require('../controllers/userController')

const {
  addProduct,
  addMultipleProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController')

const {
  createTransactionByAdmin,
  getTransactions
} = require('../controllers/transactionController')

const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')

const router = express.Router()

router.get('/', (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {
  res.status(200).json({
    error: true,
    message: 'Welcome'
  })
})

router.post('/admin/register', registerAdmin)
router.post('/admin/login', loginAdmin)

router.get('/verify', verifyToken, verifyAccessToken)
router.delete('/logout', logout)

router.post('/product', verifyToken, verifyAdmin, addProduct)
router.post('/product/multiple', verifyToken, verifyAdmin, urlencodedParser, addMultipleProduct)
router.get('/product', verifyToken, getAllProduct)
router.put('/product', verifyToken, verifyAdmin, updateProduct)
router.put('/product/delete', verifyToken, verifyAdmin, deleteProduct)

router.post('/admin/transaction', verifyToken, verifyAdmin, urlencodedParser, createTransactionByAdmin)
router.get('/admin/transaction', verifyToken, verifyAdmin, getTransactions)

export {}
module.exports = router
