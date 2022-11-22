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

})

const updateUser = asynceHandler(async (req, res) => {

})

const deleteUser = asynceHandler(async (req, res) => {

})

module.exports = { getAllUsers, createUser, updateUser, deleteUser }