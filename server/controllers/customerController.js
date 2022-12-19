const Customer = require('../models/customer')
const bcrypt = require('bcrypt')
require('express-async-errors')

const getAllCustomers = async (req, res) => {
  const customers = await Customer.find().select('password').lean()
  if (!customers.length) {
    return res.status(400).json({ message: 'No Customer Found' })
  }
  res.json(customers)
}

const createCustomer = async (req, res) => {
  const { customername, email, password } = req.body
  console.log(customername, email, password)

  if (!customername || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const duplicateName = await Customer.findOne({ customername }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicateName) {
    return res.status(409).json({ message: 'Customer Name already exist, Please try another one' })
  }

  const duplicateEmail = await Customer.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicateEmail) {
    return res.status(409).json({ message: 'Email already exist, Please try another one' })
  }

  const hashed = await bcrypt.hash(password, 10)

  const info = { customername, email, password: hashed }

  const newCustomer = Customer.create(info)

  if (newCustomer) {
    res.status(201).json({ message: `New Customer: '${customername}' has been created` })
  } else {
    res.status(400).json({ message: 'Invalid customer data received' })
  }

}


const updateCustomer = async (req, res) => { }
const deleteCustomer = async (req, res) => { }

module.exports = { getAllCustomers, createCustomer, updateCustomer, deleteCustomer }