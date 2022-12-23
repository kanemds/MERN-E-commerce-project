const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // from which Shcema 
    ref: 'User',
    default: null
  },
  products: {
    type: mongoose.Schema.Types.ObjectId,
    // from which Shcema 
    ref: 'Product',
    default: null
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Cart', cartSchema)