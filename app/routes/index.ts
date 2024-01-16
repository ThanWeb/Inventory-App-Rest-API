const express = require('express')
const router = express.Router()
const { Request, Response, NextFunction } = require('express')

router.get('/', (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {
  res.status(200).json({
    error: true,
    message: 'Welcome'
  })
})

export {}

module.exports = router
