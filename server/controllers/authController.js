const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asynceHandler = require('express-async-handler')
require('dotenv').config()

const login = asynceHandler(async (req, res) => {

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

})

const refresh = (req, res) => {

}

const logout = (req, res) => {

}

module.exports = { login, refresh, logout }