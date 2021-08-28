const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  code: {
    type: Number,
    min: 100,
    max: 299,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['inflow', 'outflow'],
    required: true,
  },
})

module.exports = mongoose.model('Category', categorySchema)
