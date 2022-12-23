const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  // cartid: {
  //   type: String,
  //   default: null
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // from which Shcema 
    ref: 'User',
    default: null
  },
  product: {
    type: [String]
  },
  itemcounts: {
    type: [Number],
    default: 0
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Cart', cartSchema)