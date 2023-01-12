const router = require('express').Router()
const { getAllOrder, updateOrder, deleteOrder } = require('../../controllers/orderController')

router.route('/')
  .get(getAllOrder)
  .patch(updateOrder)
  .delete(deleteOrder)

module.exports = router