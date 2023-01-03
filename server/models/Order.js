const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // from which Shcema 
    ref: 'User'
  },
  customerId: {
    type: String
  },
  paymentId: {
    type: String
  },
  productId: {
    type: [mongoose.Schema.Types.ObjectId],
    // from which Shcema 
    ref: 'Product',
    // from which Shcema 
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
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Order', orderSchema)