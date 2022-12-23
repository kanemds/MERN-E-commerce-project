const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  itemcounts: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)