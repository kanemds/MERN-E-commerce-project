const router = require('express').Router()

router.route('/')
  .post()

router.route('/refresh')
  .get()

router.route('/logout')
  .post()

module.exports = router