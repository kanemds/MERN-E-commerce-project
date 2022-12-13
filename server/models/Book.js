const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Book', bookSchema)

