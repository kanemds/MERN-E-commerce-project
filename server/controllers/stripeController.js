require('express-async-errors')
require('dotenv').config()
const User = require('../models/User')

const stripe = require('stripe')(process.env.STRIPE_SECRET)

const payment = async (req, res) => {

  const { username, product } = req.body

  console.log(product)

  const currentUser = await User.findOne({ username }).select({ username: 1, email: 1 }).lean().exec()
  if (!currentUser) return res.status(400).json({ message: 'No User Found' })

  const customer = await stripe.customers.create({
    metadata: {
      user: JSON.stringify(currentUser),
      // cart: JSON.stringify(product) must be a string under 500 characters
    }
  })

  const line_items = product.details.map(item => {
    return {
      price_data: {
        currency: 'cad',
        product_data: {
          name: item.title,
          images: [item.image],
          metadata: {
            product_id: item.bookId
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
    customer: customer.id,
    line_items,
    phone_number_collection: {
      enabled: true
    },
    mode: 'payment',
    // to the location when payment is successed
    success_url: `${process.env.CLIENT_URL}/payment-success`,
    // to the location when press back or cancel the payment
    cancel_url: `${process.env.CLIENT_URL}/carts`,
  }

  const session = await stripe.checkout.sessions.create(info)
  console.log('session', session)


  // below it's from original code "form controll"
  // res.redirect(303, session.url)

  // since using onClick event, we're using this
  res.status(201).json({ url: session.url })
}



// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.SIGNING_SECRET

const webHook = (req, res) => {
  const sig = req.headers['stripe-signature']

  let data
  let eventType

  if (endpointSecret) {

    let event

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    } catch (err) {
      // On error, log and return the error message
      // console.log(`❌ Error message: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    data = event.data.object
    eventType = event.type

  } else {
    data = req.body.data.object
    eventType = req.body.type
  }

  // only handle one event
  if (eventType === 'checkout.session.completed') {
    stripe.customers
      .retrieve(data.customer)
      .then(customer => {
        console.log(customer)
        console.log('data', data)
      })
      .catch(error => console.log(error.message))
  }


  // Successfully constructed event
  // console.log('✅ Success:', event.id)

  // Return a response to acknowledge receipt of the event
  res.json({ received: true })
}




module.exports = { payment, webHook }