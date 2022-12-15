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
  section: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Book', bookSchema)

