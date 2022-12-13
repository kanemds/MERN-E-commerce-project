const router = require('express').Router()
const { createImage } = require('../../controllers/bookController')

router.route('/')
  .get()
  .post(createImage)
  .patch()
  .delete()

module.exports = router

