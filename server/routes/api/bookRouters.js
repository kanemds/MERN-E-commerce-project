const router = require('express').Router()
const { getALlBooks, createImage, updateBook, deleteBook, updateStocks } = require('../../controllers/bookController')

router.route('/')
  .get(getALlBooks)
  .post(createImage)
  .patch(updateBook)
  .patch(updateStocks)
  .delete(deleteBook)

module.exports = router

