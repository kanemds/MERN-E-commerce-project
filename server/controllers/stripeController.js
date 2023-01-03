require('express-async-errors')
require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET)

const payment = async (req, res) => {

  const { username, product } = req.body

  console.log(username)
  console.log(product)

  const line_items = product.details.map(item => {
    return {
      price_data: {
        currency: 'cad',
        product_data: {
          name: item.title,
          images: [item.image],
          metadata: {
            product_id: item._id
          }
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }
  })




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
    line_items,
    phone_number_collections: {
      enabled: true
    },
    mode: 'payment',
    // to the location when payment is successed
    success_url: `${process.env.CLIENT_URL}/payment-success`,
    // to the location when press back or cancel the payment
    cancel_url: `${process.env.CLIENT_URL}/carts`,
  }

  const session = await stripe.checkout.sessions.create(info)
  console.log(session)


  // below it's from original code "form controll"
  // res.redirect(303, session.url)

  // since using onClick event, we're using this
  res.status(201).json({ url: session.url })
}



// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.SIGNING_SECRET

const webHook = (req, res) => {
  const sig = req.headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  // Handle the event


  // Return a 200 res to acknowledge receipt of the event
  res.send().end()
}



module.exports = { payment, webHook }