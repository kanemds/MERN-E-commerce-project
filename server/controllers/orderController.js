const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

const getAllOrder = async (req, res) => {
  const orders = await Order.find().lean()
  if (!orders?.length) return res.status(400).json({ message: 'No Orders Found' })

  res.status(200).json(orders)
}

const createOrder = async (customer, data) => {
  const { cartId } = customer.metadata
  const { userId } = customer.metadata

  const paidItems = await Product.findById(cartId).exec()
  const paidUser = await User.findById(userId).select('-password').lean().exec()

  const newOrder = new Order({
    user: paidUser,
    customerId: data.customer,
    paymentId: data.payment_intent,
    products: paidItems,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status
  })

  const saveOrder = await newOrder.save()
  console.log("Processed Order", saveOrder)
  // send email event here if needed
}

const updateOrder = async (req, res) => {
  const { id, name, email, street, city, country, postalCode, phone } = req.body

  console.log(req.body)

  const currentOrder = await Order.findById(id).exec()

  console.log(currentOrder)
  console.log(name)

  const { address } = currentOrder.shipping

  currentOrder.shipping.name = name
  currentOrder.shipping.email = email
  address.line1 = street
  address.city = city
  address.country = country
  address.postal_code = postalCode
  currentOrder.shipping.phone = phone

  await currentOrder.save()
  res.status(200).json({ message: 'Order info Update Success' })

}

const deleteOrder = async (req, res) => {
  const { id } = req.body

  if (!id) res.status(400).json({ message: 'Order Id reqiured' })

  const order = await Order.findById(id).exec()

  if (!order) res.status(400).json({ message: 'Order Not Found' })

  const result = await order.deleteOne()

  const reply = `Order ${result.title} with ID ${result._id} deleted`

  res.json(reply)
}


module.exports = { getAllOrder, createOrder, updateOrder, deleteOrder }