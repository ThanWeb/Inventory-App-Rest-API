const { Request, Response } = require('express')
const { Product } = require('../models')

async function addProduct (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    const { name, capitalPrice, sellPrice, stock, unit }: { name: string, capitalPrice: number, sellPrice: number, stock: number, unit: string } = req.body

    const isExist = await checkProductExistByName(name)

    if (isExist !== null) {
      return res.status(400).json({
        error: false,
        message: 'Product With Same Name Already Exist'
      })
    }

    await Product.create({ name, capitalPrice, sellPrice, stock, unit })

    return res.status(201).json({
      error: false,
      message: 'Product Added'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Server Error'
    })
  }
}

async function getAllProduct (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    const products = await Product.findAll()

    return res.status(200).json({
      error: false,
      products
    })
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Server Error'
    })
  }
}

async function updateProduct (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    const { id }: { id: number } = req.params
    const { name, capitalPrice, sellPrice, stock, unit }: { name: string, capitalPrice: number, sellPrice: number, stock: number, unit: string } = req.body

    const isExist = await checkProductExistById(id)

    if (isExist === null) {
      return res.status(404).json({
        error: false,
        message: 'Product Not Found'
      })
    }

    await Product.update({ name, capitalPrice, sellPrice, stock, unit }, { where: id })

    return res.status(200).json({
      error: false,
      message: 'Product Updated'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Server Error'
    })
  }
}

async function deleteProduct (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    const { id }: { id: number } = req.params

    const isExist = await checkProductExistById(id)

    if (isExist === null) {
      return res.status(404).json({
        error: false,
        message: 'Product Not Found'
      })
    }

    await Product.delete({ where: { id } })

    return res.status(200).json({
      error: false,
      message: 'Product Deleted'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: error
    })
  }
}

async function checkProductExistByName (name: string): Promise<Record<string, any> | null> {
  const product = await Product.findOne({
    where: { name }
  })

  return product
}

async function checkProductExistById (id: number): Promise<Record<string, any> | null> {
  const product = await Product.findOne({
    where: { id }
  })

  return product
}

export {}
module.exports = { addProduct, getAllProduct, updateProduct, deleteProduct }
