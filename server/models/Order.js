const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  products: {
    type: Object,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  shipping: {
    type: Object,
    required: true
  },
  delivery_status: {
    type: String,
    default: "sent"
  },
  payment_status: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Order', orderSchema)