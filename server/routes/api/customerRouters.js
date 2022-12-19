const router = require('express').Router()
const { getAllCustomers, createCustomer, updateCustomer, deleteCustomer } = require('../../controllers/customerController')

router.route('/')
  .get(getAllCustomers)
  .post(createCustomer)
  .patch(updateCustomer)
  .delete(deleteCustomer)

module.exports = router