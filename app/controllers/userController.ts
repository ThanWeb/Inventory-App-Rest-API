const { Request, Response } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

async function register (req: typeof Request, res: typeof Response): Promise<typeof Response> {
  try {
    const { username, password }: { username: string, password: string } = req.body

    if (username.length < 5) {
      return res.status(400).json({
        error: true,
        message: 'Nama Akun Minimal 5 Karakter'
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: true,
        message: 'Kata Sandi Minimal 8 Karakter'
      })
    }

    const isExisting = await findUserByUsername(username)

    if (isExisting !== null) {
      return res.status(400).json({
        error: true,
        message: 'Akun Sudah Terdaftar'
      })
    }

    const hashPassword = bcrypt.hashSync(password, 10)
    await User.create({ username, password: hashPassword })

    return res.status(201).json({
      error: false,
      message: 'Pendaftaran Berhasil'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Kesalahan Pada Server'
    })
  }
}

async function login (req: typeof Request, res: typeof Response): Promise<any> {
  let refreshToken = req?.cookies?.refreshToken
  const { username, password }: { username: string, password: string } = req.body

  if (username.length < 5) {
    return res.status(400).json({
      error: true,
      message: 'Nama Akun Minimal 5 Karakter'
    })
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: true,
      message: 'Kata Sandi Minimal 8 Karakter'
    })
  }

  try {
    const user = await User.findOne({
      where: { username }
    })

    if (user !== null) {
      const match = await bcrypt.compare(password, user.password)

      if (match === false) {
        return res.status(400).json({
          error: true,
          message: 'Password Salah'
        })
      } else {
        const { username, id } = user
        const accessToken = jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
        refreshToken = jwt.sign({ id, username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30 days' })

        await User.update({ refreshToken }, {
          where: { id }
        })

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
          error: false,
          accessToken,
          message: 'Selamat Datang',
          user: {
            id: req.id,
            username: req.username
          }
        })
      }
    } else {
      return res.status(404).json({
        error: true,
        message: 'Akun Belum Terdaftar'
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Kesalahan Pada Server'
    })
  }
}

async function logout (req: typeof Request, res: typeof Response): Promise<any> {
  try {
    const refreshToken = req?.cookies?.refreshToken

    if (refreshToken === undefined) {
      return res.status(400).json({
        error: true,
        message: 'Tidak Ada Aktivitas Login'
      })
    }

    const user = await User.findAll({
      where: { refreshToken }
    })

    if (user[0] !== undefined) {
      await User.update({ refreshToken: null }, {
        where: { id: user[0].id }
      })
    }

    res.clearCookie('refreshToken')

    return res.status(200).json({
      error: false,
      message: 'Logout Berhasil'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      message: 'Kesalahan Pada Server'
    })
  }
}

async function verifyAccessToken (req: typeof Request, res: typeof Response): Promise<any> {
  return res.status(200).json({
    error: false,
    message: 'Selamat Datang',
    user: {
      id: req.id,
      username: req.username
    }
  })
}

async function findUserByUsername (username: string): Promise<boolean | Record<string, any>> {
  const user = await User.findOne({
    where: { username }
  })

  return user
}

export {}

module.exports = {
  register,
  login,
  verifyAccessToken,
  logout
}
