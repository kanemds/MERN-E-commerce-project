const router = require('express').Router()
const { getAllProducts, createProduct, updateProduct, productReserved, deleteProduct } = require('../../controllers/productController')

router.route('/')
  .get(getAllProducts)
  .post(createProduct)
  .patch(updateProduct)
  .delete(deleteProduct)

router.patch('/reserved', productReserved)
module.exports = router