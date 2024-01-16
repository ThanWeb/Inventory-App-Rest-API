const express = require('express')
const { Request, Response, NextFunction } = require('express')
const { addProduct, getAllProduct, updateProduct, deleteProduct } = require('../controllers/productController')

const router = express.Router()

router.get('/', (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {
  res.status(200).json({
    error: true,
    message: 'Welcome'
  })
})

router.post('/product', addProduct)
router.get('/product', getAllProduct)
router.put('/product', updateProduct)
router.delete('/product', deleteProduct)

export {}
module.exports = router
