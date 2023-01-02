require('express-async-errors')
require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET)

const payment = async (req, res) => {

  const info = {
    submit_type: 'pay',
    mode: 'payment',
    payment_method_types: ['card'],
    shipping_address_collection: { allowed_countries: ['CA'] },
    shipping_options: [
      { shipping_rate: 'shr_1LNP85K4K0yDBdautvs6d1Jl' },
      { shipping_rate: 'shr_1LNPAbK4K0yDBdauAezenimx' },
      { shipping_rate: 'shr_1LNP9vK4K0yDBdaujqxdZlnA' },
    ],
    line_items: [
      {
        price_data: { currency: 'cad', product_data: { name: 'T-shirt' }, unit_amount: 2000 },
        quantity: 1,
      },
    ],
    mode: 'payment',
    // to the location when payment is successed
    success_url: `${process.env.CLIENT_URL}/payment-success`,
    // to the location when press back or cancel the payment
    cancel_url: `${process.env.CLIENT_URL}/carts`,
  }

  const session = await stripe.checkout.sessions.create(info)
  console.log(session)
  console.log(session.url)

  // below it's from original code "form controll"
  // res.redirect(303, session.url)

  // since using onClick event, we're using this
  res.status(201).json({ url: session.url })
}

module.exports = payment