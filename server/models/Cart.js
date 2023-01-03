const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // from which Shcema 
    ref: 'User',
    default: null
  },
  productId: {
    type: [mongoose.Schema.Types.ObjectId],
    // from which Shcema 
    ref: 'Product',
    // from which Shcema 
    required: true
  },
  totalprice: {
    type: Number,
    required: true
  },
  totalproducts: {
    type: Number,
    required: true
  }
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Cart', cartSchema)