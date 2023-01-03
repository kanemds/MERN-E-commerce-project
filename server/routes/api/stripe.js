const express = require('express')
const router = express.Router()

const { payment, webHook } = require('../../controllers/stripeController')



router.post('/create-checkout-session', payment)
router.post('/webhook', express.raw({ type: 'application/json' }), webHook)

module.exports = router