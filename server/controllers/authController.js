const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const asynceHandler = require('express-async-handler')
require('dotenv').config()
require('express-async-errors') // instead of try catch

const login = async (req, res) => {

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const currentUser = await User.findOne({ username }).exec()

  if (!currentUser || !currentUser.active) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const match = await bcrypt.compare(password, currentUser.password)

  if (!match) return res.status(401).json({ message: 'Unauthorized' })

  const accessToken = jwt.sign({
    'UserInfo': {
      'username': currentUser.username,
      'roles': currentUser.roles
    }
  },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign({
    'username': currentUser.username
  },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )

  // use refreshToken set cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true, // https
    sameSite: 'None', // allow cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  // send accessToken username and roles
  res.json({ accessToken })
}

const refresh = (req, res) => {
  const cookies = req.cookies

  if (!cookies.jwt) {

    return res.status(401).json({ message: 'Unauthorized' })
  }

  const refreshToken = cookies.jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (error, decoded) => {
      if (error) return res.status(403).json({ message: 'Forbidden' })

      const currentUser = await User.findOne({ username: decoded.username })

      if (!currentUser) return res.status(401).json({ message: 'Unauthroized' })

      const accessToken = jwt.sign({
        'UserInfo': {
          'username': currentUser.username,
          'roles': currentUser.roles

        }
      },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      )

      res.json({ accessToken })
    }
  )
}

const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204)
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie Cleared' })
}

module.exports = { login, refresh, logout }