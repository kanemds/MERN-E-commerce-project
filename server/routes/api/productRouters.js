const router = require('express').Router()
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../../controllers/productController')

router.route('/')
  .get(getAllProducts)
  .post(createProduct)
  .patch(updateProduct)
  .delete(deleteProduct)

module.exports = router