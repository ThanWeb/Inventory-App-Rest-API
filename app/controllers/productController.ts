const { Request, Response } = require('express')
const { Product } = require('../models')
const deleteFile = require('../services/deleteFile')

async function addProduct (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    const userId: number = req.id
    const { name, capitalPrice, sellPrice, stock, unit, imageUrl }: { name: string, capitalPrice: number, sellPrice: number, stock: number, unit: string, imageUrl: string } = req.body

    const isExist = await checkProductExistByName(name)

    if (isExist !== null) {
      return res.status(400).json({
        error: true,
        message: 'Nama Produk Duplikat'
      })
    }

    const product = await Product.create({
      createdBy: userId,
      lastUpdatedBy: userId,
      name: name.toLowerCase(),
      capitalPrice,
      sellPrice,
      stock,
      unit: unit.toLowerCase(),
      imageUrl,
      isDeleted: false
    })

    return res.status(201).json({
      error: false,
      message: 'Produk Berhasil Ditambahkan',
      product
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Kesalahan Pada Server'
    })
  }
}

async function uploadSingleImageProduct (req: any, res: typeof Response): Promise<typeof Response> {
  try {
    const finalImageURL = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename

    return res.status(200).json({
      error: false,
      image: finalImageURL
    })
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Kesalahan Pada Server'
    })
  }
}

async function addMultipleProduct (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    const userId: number = req.id
    const products: Array<{ name: string, capitalPrice: string, sellPrice: string, stock: string, unit: string }> = req.body.products

    for (let index = 0; index < products.length; index++) {
      const isExist = await checkProductExistByName(products[index].name)

      if (isExist !== null) {
        return res.status(400).json({
          error: true,
          message: 'Nama Produk Duplikat'
        })
      }

      await Product.create({
        createdBy: userId,
        lastUpdatedBy: userId,
        name: products[index].name.toLowerCase(),
        capitalPrice: parseInt(products[index].capitalPrice),
        sellPrice: parseInt(products[index].sellPrice),
        stock: parseInt(products[index].stock),
        unit: products[index].unit.toLowerCase(),
        isDeleted: false
      })
    }

    return res.status(201).json({
      error: false,
      message: 'Semua Produk Berhasil Ditambahkan'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Kesalahan Pada Server'
    })
  }
}

async function getAllProduct (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    const products = await Product.findAll({
      where: {
        isDeleted: false
      }
    })

    return res.status(200).json({
      error: false,
      products
    })
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Kesalahan Pada Server'
    })
  }
}

async function updateProduct (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    const userId: number = req.id
    const { id, name, capitalPrice, sellPrice, stock, unit, imageUrl }: { id: number, name: string, capitalPrice: number, sellPrice: number, stock: number, unit: string, imageUrl: string } = req.body

    const isExist = await checkProductExistById(id)
    const sameName = await checkProductExistByName(name)

    if (isExist === null) {
      return res.status(404).json({
        error: true,
        message: 'Produk Tidak Ditemukan'
      })
    }

    if (sameName !== null) {
      if (sameName.id !== id) {
        return res.status(400).json({
          error: true,
          message: 'Nama Produk Duplikat'
        })
      }
    }

    if (imageUrl !== '' && isExist.imageUrl !== null && imageUrl !== isExist.imageUrl) {
      await deleteFile(isExist.imageUrl)
    }

    const product = await Product.update({
      lastUpdatedBy: userId,
      name: name.toLowerCase(),
      capitalPrice,
      sellPrice,
      stock,
      unit: unit.toLowerCase(),
      imageUrl
    }, {
      where: {
        id
      },
      returning: true
    })

    return res.status(200).json({
      error: false,
      message: 'Produk Berhasil Diubah',
      product: product[1][0]
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Kesalahan Pada Server'
    })
  }
}

async function deleteProduct (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    const userId: number = req.id
    const { id }: { id: number } = req.body

    const isExist = await checkProductExistById(id)

    if (isExist === null || isExist.isDeleted === true) {
      return res.status(404).json({
        error: true,
        message: 'Produk Tidak Ditemukan'
      })
    }

    await deleteFile(isExist.imageUrl)
    await Product.update({ lastUpdatedBy: userId, isDeleted: true }, { where: { id } })

    return res.status(200).json({
      error: false,
      message: 'Produk Berhasil Dihapus'
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
    where: { name: name.toLowerCase(), isDeleted: false }
  })

  return product
}

async function checkProductExistById (id: number): Promise<Record<string, any> | null> {
  const product = await Product.findOne({
    where: { id }
  })

  return product
}

module.exports = {
  addProduct,
  uploadSingleImageProduct,
  addMultipleProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
}
