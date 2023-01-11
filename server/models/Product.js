const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

  details: [{
    bookId: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    previous: {
      type: Number,
      default: 0,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    save: {
      type: Boolean,
      default: false
    }
  }],
  totalcounts: {
    type: Number,
    required: true
  },
  totalprice: {
    type: Number,
    required: true
  },
  pending: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)