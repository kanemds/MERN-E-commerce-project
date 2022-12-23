const router = require('express').Router()
const { getAllCarts, createCart, updateCart, deleteCart } = require('../../controllers/cartController')

router.route('/')
  .get(getAllCarts)
  .post(createCart)
  .patch(updateCart)
  .delete(deleteCart)

module.exports = router