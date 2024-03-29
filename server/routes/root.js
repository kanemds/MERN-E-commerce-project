const express = require('express')
const router = express.Router()
const path = require('path')
const user = require('./api/userRoutes')
const note = require('./api/noteRouters')
const auth = require('./api/authRouters')
const book = require('./api/bookRouters')
const cart = require('./api/cartRouters')
const product = require('./api/productRouters')
const order = require('./api/orderRouters')
const stripe = require('./api/stripe')

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'))
})


// routes
router.use('/users', user)
router.use('/notes', note)
router.use('/auth', auth)
router.use('/books', book)
router.use('/carts', cart)
router.use('/products', product)
router.use('/orders', order)
router.use('/', stripe)


module.exports = router