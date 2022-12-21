const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  instocks: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Book', bookSchema)

