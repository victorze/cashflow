const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  code: {
    type: Number,
    min: 100,
    max: 199,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Account', accountSchema)
