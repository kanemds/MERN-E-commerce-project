const router = require('express').Router()
const { getALlBooks, createImage, updateBook } = require('../../controllers/bookController')

router.route('/')
  .get(getALlBooks)
  .post(createImage)
  .patch(updateBook)
  .delete()

module.exports = router

