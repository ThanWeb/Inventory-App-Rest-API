const express = require('express')
const { Request, Response, NextFunction } = require('express')
const { register, login, verifyAccessToken, logout } = require('../controllers/userController')
const { addProduct, getAllProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router()

router.get('/', (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {
  res.status(200).json({
    error: true,
    message: 'Welcome'
  })
})

router.post('/register', register)
router.post('/login', login)
router.post('/verify', verifyToken, verifyAccessToken)
router.delete('/logout', logout)

router.post('/product', verifyToken, addProduct)
router.get('/product', verifyToken, getAllProduct)
router.put('/product', verifyToken, updateProduct)
router.put('/product/delete', verifyToken, deleteProduct)

export {}
module.exports = router
