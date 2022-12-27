const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  // bookId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   // from which Shcema 
  //   ref: 'Book',
  //   required: true
  // },
  details: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      // from which Shcema 
      ref: 'Book',
      required: true
    },
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true }
  }],
  itemcounts: {
    type: Number,
    required: true
  },
  price: {
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