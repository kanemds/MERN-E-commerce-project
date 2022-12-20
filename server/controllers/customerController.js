const Customer = require('../models/customer')
const bcrypt = require('bcrypt')
require('express-async-errors')

const getAllCustomers = async (req, res) => {
  const customers = await Customer.find().select('-password').lean()
  if (!customers.length) {
    return res.status(400).json({ message: 'No Customer Found' })
  }
  res.json(customers)
}

const createCustomer = async (req, res) => {
  const { customername, email, password } = req.body

  const lowerCase = email.toLowerCase()


  if (!customername || !lowerCase || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const duplicateName = await Customer.findOne({ customername }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicateName) {
    return res.status(409).json({ message: 'Customer Name already exist, Please try another one' })
  }

  const duplicateEmail = await Customer.findOne({ lowerCase }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicateEmail) {
    return res.status(409).json({ message: 'Email already exist, Please try another one' })
  }

  const hashed = await bcrypt.hash(password, 10)

  const info = { customername, lowerCase, password: hashed }

  const newCustomer = Customer.create(info)

  if (newCustomer) {
    res.status(201).json({ message: `New Customer: '${customername}' has been created` })
  } else {
    res.status(400).json({ message: 'Invalid customer data received' })
  }

}


const updateCustomer = async (req, res) => {
  const { id, customername, email, password } = req.body

  const lowerCase = email.toLowerCase()

  if (!customername || !lowerCase) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const currentCustomer = await Customer.findById(id).exec()

  if (!currentCustomer) {
    return res.status(400).json({ message: 'Customer not Found' })
  }

  const duplicateName = await Customer.findOne({ customername }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicateName && duplicateName?._id.toString() !== id) {
    return res.status(409).json({ message: 'Customer Name already exist, Please try another one' })
  }

  const duplicateEmail = await Customer.findOne({ lowerCase }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicateEmail && duplicateEmail?._id.toString() !== id) {
    return res.status(409).json({ message: 'Email already exist, Please try another one' })
  }

  currentCustomer.customername = customername
  currentCustomer.email = lowerCase

  if (password) {
    currentCustomer.password = await bcrypt.hash(password, 10)
  }

  const update = await currentCustomer.save()

  res.json({ message: `${update.customername} updated` })

}

const deleteCustomer = async (req, res) => {
  const { id } = req.body

  if (!id) return res.status(400).json({ message: 'Customer Id required' })

  const currentCustomer = await Customer.findById(id).exec()

  if (!currentCustomer) return res.status(400).json({ message: 'Customer not Found' })

  const result = await currentCustomer.deleteOne()

  const reply = `Customer '${result.customername}' delete`

  res.json(reply)

}

module.exports = { getAllCustomers, createCustomer, updateCustomer, deleteCustomer }