
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
  const { orderId, owner, details } = req.body

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
      totalcounts: details.quantity,
      totalprice: details.quantity * book.price
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

      order.totalcounts += details.quantity
      order.totalprice += details.quantity * book.price

      order.save()
      return res.status(201).json(order._id)
    }
    else if (order && duplicate) {

      duplicate.quantity += details.quantity
      duplicate.total += details.quantity * book.price


      order.totalcounts += details.quantity
      order.totalprice += details.quantity * book.price
      order.save()
      return res.status(201).json(order._id)
    }
  } else {
    return res.status(500), json({ message: 'Server Error' })
  }
}


const updateProduct = async (req, res) => {
  const { orderId, details } = req.body

  const currentCart = await Product.findById(orderId).exec()

  if (!currentCart) return res.status(400).json({ message: 'Shopping Cart Not Found' })

  const selectedProduct = currentCart.details.find(product => product.bookId === details.bookId)

  if (!selectedProduct) return res.status(400).json({ message: 'Select Product Not Found' })

  const inventory = await Book.findById(details.bookId).exec()

  if (!inventory) return res.status(400).json({ message: 'Select Product Not Found' })

  if (inventory.instocks < details.quantity) {
    details.quantity = inventory.instocks
  }

  if (inventory.instocks > details.quantity && details.quantity === 0) {
    // details.quantity = inventory.instocks
    details.quantity += 1
  }

  selectedProduct.quantity = details.previous
  selectedProduct.quantity = details.quantity
  selectedProduct.total = selectedProduct.price * details.quantity

  let newCounts = 0
  let newTotal = 0
  currentCart.details.forEach(product => {
    newCounts += product.quantity
    newTotal += product.total
  })

  currentCart.totalcounts = newCounts
  currentCart.totalprice = newTotal

  currentCart.save()
  res.status(201).json({ message: 'Quantity Updated' })
}

const productReserved = async (req, res) => {
  const { pending, isSave, cart } = req.body

  const currentCart = await Product.findById(cart).exec()
  currentCart.pending = pending

  currentCart.details.forEach(item => {
    item.issave = isSave
  })

  await currentCart.save()
  res.status(201).json({ message: 'Cart Item(s) has been reserved' })
}

const deleteProduct = async (req, res) => {
  const { cartId, productId } = req.body

  if (!cartId && !productId) return res.status(400).json({ message: 'ALL Fields required' })

  const currentCart = await Product.findById(cartId).exec()

  if (!currentCart) return res.status(400).json({ message: 'Cart not Found' })

  const currentProduct = currentCart.details.find(product => product.bookId === productId)

  if (!currentProduct) return res.status(400).json({ message: 'Product not Found' })

  const currentBook = await Book.findById(productId).exec()

  if (!currentBook) return res.status(400).json({ message: 'Book not Found' })

  if (currentProduct.issave) {
    currentBook.instocks += currentProduct.quantity
  }

  await currentBook.save()

  const newCartList = currentCart.details.filter(product => product.bookId !== productId)

  currentCart.totalcounts -= currentProduct.quantity
  currentCart.totalprice -= currentProduct.total
  currentCart.details = newCartList

  await currentCart.save()

  res.status(201).json({ message: `${currentProduct.title} has been removed` })

}

module.exports = { getAllProducts, createProduct, updateProduct, productReserved, deleteProduct }