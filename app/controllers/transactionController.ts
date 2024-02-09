const { Request, Response } = require('express')
const { Product, Cart, Transaction, User } = require('../models/index')

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

    const { id } = await Transaction.create({
      ownedBy: req.id,
      total,
      isUnpaid: true
    })

    products.forEach(product => {
      product.transactionId = id
    })

    await Cart.bulkCreate(products, { fields: ['productId', 'transactionId', 'total'] })

    return res.status(201).json({
      error: false,
      message: 'Transaksi Berhasil',
      transactionId: id
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Kesalahan Pada Server'
    })
  }
}

async function getTransactions (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    const transcations = await Transaction.findAll({
      attributes: {
        exclude: ['id', 'updatedAt', 'ownedBy']
      },
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['username', 'role']
        }
      ]
    })

    return res.status(200).json({
      error: false,
      transcations
    })
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Kesalahan Pada Server'
    })
  }
}

async function getTransactionDetailById (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    const id = req.params.id

    const carts = await Cart.findAll({
      where: {
        transactionId: id
      },
      attributes: {
        exclude: ['id', 'updatedAt', 'transactionId', 'productId']
      },
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['name', 'sellPrice', 'unit']
        }
      ]
    })

    const transaction = await Transaction.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['id', 'updatedAt', 'ownedBy']
      },
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['username', 'role']
        }
      ]
    })

    return res.status(200).json({
      error: false,
      transaction: {
        ...transaction.dataValues,
        carts
      }
    })
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Kesalahan Pada Server'
    })
  }
}

export {}

module.exports = {
  createTransactionByAdmin,
  getTransactions,
  getTransactionDetailById
}
