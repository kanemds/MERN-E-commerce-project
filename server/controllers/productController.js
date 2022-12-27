
const Product = require('../models/Product')
const Book = require('../models/Book')

require('express-async-errors')

const getAllProducts = async (req, res) => {
  const products = await Product.find()
  if (!products.length) {
    return res.status(400).json({ message: 'No Products Found' })
  }
  res.json(products)
}

const createProduct = async (req, res) => {
  const { details, totalcounts, totalprice, } = req.body

  console.log(details)

  console.log(req.body)
  const book = await Book.findById(details.bookId)

  console.log(book)


  // const existUser = await User.findOne(user).exec()
  // console.log(existUser)

  // const currentProduct = await Product.findOne({ bookId }).exec()


  // if (currentProduct) {
  //   currentProduct.itemcounts += itemcounts
  //   currentProduct.totalprice += totalprice
  //   currentProduct.save()
  //   return res.status(201).json(currentProduct._id)
  // } else {
  //   const info = { bookId, itemcounts, price, totalprice }

  //   const newProduct = await Product.create(info)

  //   return res.status(201).json(newProduct._id)
  // }

}


const updateProduct = async (req, res) => {
  const { id, productname, email, password } = req.body

  const lowerCase = email.toLowerCase()

  if (!productname || !lowerCase) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const currentProduct = await Product.findById(id).exec()

  if (!currentProduct) {
    return res.status(400).json({ message: 'Product not Found' })
  }

  const duplicateName = await Product.findOne({ productname }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicateName && duplicateName?._id.toString() !== id) {
    return res.status(409).json({ message: 'Product Name already exist, Please try another one' })
  }

  const duplicateEmail = await Product.findOne({ lowerCase }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicateEmail && duplicateEmail?._id.toString() !== id) {
    return res.status(409).json({ message: 'Email already exist, Please try another one' })
  }

  currentProduct.productname = productname
  currentProduct.email = lowerCase

  if (password) {
    currentProduct.password = await bcrypt.hash(password, 10)
  }

  const update = await currentProduct.save()

  res.json({ message: `${update.productname} updated` })

}

const deleteProduct = async (req, res) => {
  const { id } = req.body

  if (!id) return res.status(400).json({ message: 'Product Id required' })

  const currentProduct = await Product.findById(id).exec()

  if (!currentProduct) return res.status(400).json({ message: 'Product not Found' })

  const result = await currentProduct.deleteOne()

  const reply = `Product '${result.productname}' delete`

  res.json(reply)

}

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct }