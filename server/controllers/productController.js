
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
  const { orderId, owner, details, totalcounts, totalprice } = req.body

  // less info from frontend prevent error input
  // chose add book info to product model prevent nested mapping in the future

  const book = await Book.findById(details.bookId).exec()

  // const user = await User.findOne(owner).exec()
  const order = await Product.findById(orderId).exec()

  if (!order) {
    const info = {
      details: {
        image: book.image,
        title: book.title,
        author: book.author,
        price: book.price,
        quantity: details.quantity,
        total: details.quantity * book.price,
        ...details
      },
      totalcounts, totalprice
    }
    const newProduct = await Product.create(info)
    return res.status(201).json(newProduct._id)
  } else if (order) {
    const duplicate = order.details.find(product => product.bookId === details.bookId)
    if (order && !duplicate) {

      const newProdut = {
        image: book.image,
        title: book.title,
        author: book.author,
        price: book.price,
        quantity: details.quantity,
        total: details.quantity * book.price
      }
      order.details.push({ ...newProdut, ...details })

      order.totalcounts += totalcounts
      order.totalprice += totalprice

      order.save()
      return res.status(201).json(order._id)
    }
    else if (order && duplicate) {

      duplicate.quantity += details.quantity
      duplicate.total += details.quantity * book.price


      order.totalcounts += totalcounts
      order.totalprice += totalprice
      order.save()
      return res.status(201).json(order._id)
    }
  } else {
    return res.status(500), json({ message: 'Server Error' })
  }
}


const updateProduct = async (req, res) => {
  const { orderId, details } = req.body
  console.log(req.body)
  console.log(details)
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