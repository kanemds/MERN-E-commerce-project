const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    // from which Shcema 
    ref: 'User',
    default: null
  },
  details: [{
    bookId: {
      type: String,
      required: true
    },
    image: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true }
  }],
  totalcounts: {
    type: Number,
    required: true
  },
  totalprice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)