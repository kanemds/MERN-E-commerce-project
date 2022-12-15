const router = require('express').Router()
const { getALlBooks, createImage } = require('../../controllers/bookController')

router.route('/')
  .get(getALlBooks)
  .post(createImage)
  .patch()
  .delete()

module.exports = router

