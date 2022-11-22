const User = require('../models/User')
const Note = require('../models/Note')
const asynceHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllUsers = asynceHandler(async (req, res) => {
  //  lean() returns a JavaScript object instead of a Mongoose document.
  const users = await User.find().select('-password').lean()
  if (!users) {
    return res.status(400).json({ message: 'No users found' })
  }
  res.json(users)
})

const createUser = asynceHandler(async (req, res) => {
  const { username, password, roles } = req.body

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // async await pass in arg inside need exec()
  const duplicate = await User.findOne({ username }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'User already exist, please try another one' })
  }

  //  const salt = bcrypt.genSaltSync(10)
  // hashed = bcrypt.hashSync(password, salt)
  const hashed = await bcrypt.hash(password, 10)
  const userObject = { username, "password": hashed, roles }

  const user = await User.create(userObject)

  if (user) {
    res.status(201).json({ message: `user: ${username} created` })
  } else {
    res.status(400).json({ message: 'Invalid user data received' })
  }
})

const updateUser = asynceHandler(async (req, res) => {

})

const deleteUser = asynceHandler(async (req, res) => {

})

module.exports = { getAllUsers, createUser, updateUser, deleteUser }