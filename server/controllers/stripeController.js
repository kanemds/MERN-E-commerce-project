require('express-async-errors')
require('dotenv').config()
const { createOrder } = require('../controllers/orderController')
const User = require('../models/User')

const stripe = require('stripe')(process.env.STRIPE_SECRET)

const payment = async (req, res) => {

  const { username, product, createdAt, inventoryIds } = req.body



  const currentUser = await User.findOne({ username }).exec()
  if (!currentUser) return res.status(400).json({ message: 'No User Found' })

  const unixTimestamp = Math.floor(createdAt / 1000)


  const customer = await stripe.customers.create({
    metadata: {
      userId: (currentUser._id).toString(),
      cartId: product._id
    }
  })

  const line_items = product.details.map(item => {



    const string = item.price.toString()

    // const price = parseInt(string.replace(".", "")) // 15.99 to 1599
    const price = parseInt(item.price * 100) // 15.99 to 1599

    return {
      price_data: {
        currency: 'cad',
        product_data: {
          name: item.title,
          metadata: {
            product_id: item.bookId
          }
        },
        unit_amount: price,
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

    // // to the location when payment is successed
    // success_url: `http://localhost:3000/payment-success/${product._id}`,
    // // to the location when press back or cancel the payment
    // cancel_url: `http://localhost:3000/carts`,

    // deployment
    success_url: `https://k-book.onrender.com/payment-success/${product._id}`,
    cancel_url: `https://k-book.onrender.com/carts`,
    expires_at: unixTimestamp + 30 * 60
  }

  const session = await stripe.checkout.sessions.create(info)
  // console.log('session', session)


  // below it's from original code "form controll"
  // res.redirect(303, session.url)

  // since using onClick event, we're using this
  res.status(201).json({ url: session.url })
}




// for local
// const webHook = (req, res) => {

//   // This is your Stripe CLI webhook secret for testing your endpoint locally.
//   const endpointSecret = process.env.SIGNING_SECRET_LOCAL

//   const sig = req.headers['stripe-signature']

//   let data
//   let eventType

//   if (endpointSecret) {

//     let event

//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
//     } catch (err) {
//       // On error, log and return the error message
//       // console.log(`❌ Error message: ${err.message}`)
//       return res.status(400).send(`Webhook Error: ${err.message}`)
//     }

//     data = event.data.object
//     eventType = event.type

//   } else {
//     data = req.body.data.object
//     eventType = req.body.type
//   }

//   // only handle one event
//   if (eventType === 'checkout.session.completed') {
//     // getting user input the email shipping address etc
//     stripe.customers
//       .retrieve(data.customer)
//       .then(customer => {
//         // after payment successed, save all the info to mongodb
//         createOrder(customer, data)
//         console.log('abc')
//       })
//       .catch(error => console.log(error.message))
//   }


//   // Successfully constructed event
//   // console.log('✅ Success:', event.id)

//   // Return a response to acknowledge receipt of the event
//   res.json({ received: true })
// }

// for deploy

const webHook = async (req, res) => {

  const endpointSecret = process.env.SIGNING_SECRET_DEPLOY

  const sig = req.headers['stripe-signature']

  let data
  let event
  let customer

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    // On error, log and return the error message
    // console.log(`❌ Error message: ${err.message}`)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  data = await event.data.object
  customer = await stripe.customers.retrieve(data.customer)

  await createOrder(customer, data)

  res.json({ message: 'Payment Successful' })
}




module.exports = { payment, webHook }