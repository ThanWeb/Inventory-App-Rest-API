const { Request, Response } = require('express')
const { Product, Cart, Transaction } = require('../models/index')

async function createTransactionByAdmin (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    let total = 0
    const products: Array<{ productId: number, transactionId?: number, total: number }> = []
    const cart: Array<{ name: string, total: number }> = req.body.cart

    for (let index = 0; index < cart.length; index++) {
      const selectedItem = await Product.findOne({
        where: { name: cart[index].name }
      })

      if (selectedItem.stock - cart[index].total < 0) {
        return res.status(400).json({
          error: true,
          message: 'Stok Tidak Cukup'
        })
      }

      total += selectedItem.sellPrice * cart[index].total
      products.push({ productId: selectedItem.id, transactionId: 0, total: cart[index].total })

      selectedItem.stock -= cart[index].total
      await selectedItem.save()
    }

    const transaction = await Transaction.create({
      ownedBy: req.id,
      total,
      isUnpaid: true
    })

    products.forEach(product => {
      product.transactionId = transaction.id
    })

    await Cart.bulkCreate(products, { fields: ['productId', 'transactionId', 'total'] })

    return res.status(201).json({
      error: false,
      message: 'Transaksi Berhasil'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Kesalahan Pada Server'
    })
  }
}

export {}

module.exports = {
  createTransactionByAdmin
}
