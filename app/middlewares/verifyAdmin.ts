const { Request, Response, NextFunction } = require('express')
const { User } = require('../models')

const verifyAdmin = (req: typeof Request, res: typeof Response, next: typeof NextFunction): any | typeof Response => {
  const user = User.findOne({
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
