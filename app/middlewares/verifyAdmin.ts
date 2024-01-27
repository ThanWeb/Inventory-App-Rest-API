const { Request, Response, NextFunction } = require('express')
const { User } = require('../models')

const verifyAdmin = async (req: typeof Request, res: typeof Response, next: typeof NextFunction): Promise<any> | Promise<typeof Response> => {
  const user = await User.findOne({
    where: { id: req.id }
  })

  if (user === null || user.role !== 'admin') {
    return res.status(401).json({
      error: true,
      message: 'Tidak Ada Hak Akses'
    })
  }

  next()
}

export {}

module.exports = verifyAdmin
