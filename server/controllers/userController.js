const User = require('../models/User')
const Note = require('../models/Note')
const asynceHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllUsers = asynceHandler(async (req, res) => {
  //  lean() returns a JavaScript object instead of a Mongoose document.
  const users = await User.find().select('-password').lean()
  if (!users?.length) {
    return res.status(400).json({ message: 'No users Found' })
  }
  res.json(users)
})

const createUser = asynceHandler(async (req, res) => {
  const { username, password, roles } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // async await pass in arg inside need exec()
  // collation check both upper and lower case
  const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'User already exist, please try another one' })
  }

  //  const salt = bcrypt.genSaltSync(10)
  // hashed = bcrypt.hashSync(password, salt)
  const hashed = await bcrypt.hash(password, 10)
  const userObject = (!Array.isArray(roles) || !roles.length)
    ? { username, "password": hashed } // default as Employee
    : { username, "password": hashed, roles } // recieved roles form req.body and repalce the default roles

  const user = await User.create(userObject)

  if (user) {
    res.status(201).json({ message: `user: ${username} created` })
  } else {
    res.status(400).json({ message: 'Invalid user data received' })
  }
})

const updateUser = asynceHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body

  if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not Found' })
  }

  // check if user already exist
  const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

  // make sure duplicate function is finish
  // if update username's id is not equal to current edit id means username already exist on other id  
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'User already exist, please try another one' })
  }

  user.username = username
  user.roles = roles
  user.active = active

  if (password) {
    user.password = await bcrypt.hash(password, 10)
  }

  const update = await user.save()

  res.json({ message: `${update.username} updated` })

})

const deleteUser = asynceHandler(async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'user ID required ' })
  }

  const note = await Note.findOne({ user: id }).lean().exec()

  if (note) {
    return res.status(400).json({ message: 'user has assigned notes' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not Found' })
  }

  const result = await user.deleteOne()

  const reply = `User ${result.username} with ID ${result._id}`

  res.json(reply)

})

module.exports = { getAllUsers, createUser, updateUser, deleteUser }