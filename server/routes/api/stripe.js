const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const payment = require('../../controllers/stripeController')


router.post('/', payment)

module.exports = router