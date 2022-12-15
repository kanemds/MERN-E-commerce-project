const router = require('express').Router()
const { getALlBooks, createImage, updateBook, deleteBook } = require('../../controllers/bookController')

router.route('/')
  .get(getALlBooks)
  .post(createImage)
  .patch(updateBook)
  .delete(deleteBook)

module.exports = router

