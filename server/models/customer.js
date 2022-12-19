const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  customername: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Customer', customerSchema)